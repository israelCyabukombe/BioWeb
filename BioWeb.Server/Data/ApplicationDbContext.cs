using BioWeb.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BioWeb.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        // Constructor accepts DbContext options and passes them to the base DbContext
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet represents a table in the database for your PersonalInfo model
        public DbSet<PersonalInfo> PersonalInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PersonalInfo>().HasData(
                new PersonalInfo
                {
                    Id = 1,
                    FirstName = "Israel",
                    LastName = "Cyabukombe",
                    Email = "israel.cyabu93@gmail.com",
                    ProfilePhotoUrl = "/images/IMG_0002.jpg",
                    SummaryText = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
                }
            );
        }
    }

}
