using BioWeb.Server.Data;
using BioWeb.Server.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//register db connection

var connectionString = builder.Configuration.GetConnectionString("BioWebDb");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<IBiographyService, BiographyService>();

//CORS
var corsPolicy = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name:corsPolicy, builder =>
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

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseCors(corsPolicy);

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

app.MapGet("/api/skills/", async (int personId, IBiographyService service) =>
{
    var skills = await service.GetSkills(personId);

    return skills is not null ? Results.Ok(skills) : Results.NotFound();
})
.WithName("GetSkills")
.WithOpenApi();

app.MapFallbackToFile("/index.html");

app.Run();
