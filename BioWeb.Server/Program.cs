using BioWeb.Server.Data;
using BioWeb.Server.Models;
using BioWeb.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true);
}
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//register db connection
var connectionString = builder.Configuration.GetConnectionString("BioWebDb");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        connectionString,
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(10),
            errorNumbersToAdd: null
        )
    )
 );

builder.Services.AddScoped<IBiographyService, BiographyService>();

//CORS
var corsPolicy = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy, builder =>
        builder.WithOrigins(
            "http://localhost:5174",
            "http://localhost:5173",
            "http://localhost:4173",
            "https://icy-desert-022716310.7.azurestaticapps.net",
            "https://bioweb-server-fkf6c7b0d2dkdede.centralus-01.azurewebsites.net",
            "https://www.icyabu.com"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

var jwtKey = builder.Configuration["Jwt:Key"]!;

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.Configure<MyBioSettings>(builder.Configuration.GetSection("MyBioSettings"));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(corsPolicy);
app.UseHttpsRedirection();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapGet("/api/personalInfo/{id}", async (int id, IBiographyService service) =>
{
    var pInfo = await service.GetPersonalInfo(id);

    return pInfo is not null ? Results.Ok(pInfo) : Results.NotFound();
})
.WithName("GetPersonalInformation")
.WithOpenApi();

app.MapGet("/api/skills", async (int personId, IBiographyService service) =>
{
    var skills = await service.GetSkills(personId);

    return skills is not null ? Results.Ok(skills) : Results.NotFound();
})
.WithName("GetSkills")
.WithOpenApi();

app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "healthy",
        service = "bioweb-service",
        dateUtc = DateTime.UtcNow,
    });
})
.WithName("health")
.WithOpenApi();

app.MapGet("/api/projects", async (IBiographyService service) =>
{
    var projects = await service.GetProjects();

    return projects is not null ? Results.Ok(projects) : Results.NotFound();
})
.WithName("GetProjects")
.WithOpenApi();

//token
app.MapPost("/api/token",
    [AllowAnonymous] (
    BioWeb.Server.Models.User user,
    IOptions<MyBioSettings> myBioSettings
) =>
{
    bool connected = false;

    if (myBioSettings.Value.Username == user.Username &&
        myBioSettings.Value.Password == user.Password)
    {
        connected = true;
    }
    if (connected == true)
    {
        var jwtKey = config.GetValue<string>("Jwt:Key")!;
        var key = Encoding.ASCII.GetBytes(jwtKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Email, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString())
            }),

            Expires = DateTime.UtcNow.AddMinutes(60),
            SigningCredentials = new SigningCredentials
            (new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha512Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var stringToken = tokenHandler.WriteToken(token);

        return Task.FromResult(Results.Ok(new { token = stringToken }));
    }

    return Task.FromResult(Results.Unauthorized());
});
 


app.MapFallbackToFile("/index.html");

app.Run();
