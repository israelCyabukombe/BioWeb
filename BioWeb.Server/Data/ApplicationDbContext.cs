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

        public DbSet<SkillLevel> SkillLevels { get; set; }

        public DbSet<Skill> Skills { get; set; }

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

            modelBuilder.Entity<SkillLevel>().HasData(
                new SkillLevel { Id = 1, description = "Beginner" },
                new SkillLevel { Id = 2, description = "Intermediate" },
                new SkillLevel { Id = 3, description = "Advanced" }
            );

            modelBuilder.Entity<Skill>().HasData(
                new Skill
                {
                    Id = 1,
                    PersonalInfoId = 1,
                    SkillName = "C#",
                    SkillLevelId = 1,
                    Category = "BackEnd"
                },
                new Skill
                {
                    Id = 2,
                    PersonalInfoId = 1,
                    SkillName = "PHP",
                    SkillLevelId = 2,
                    Category = "BackEnd"
                },
                new Skill
                {
                    Id = 3,
                    PersonalInfoId = 1,
                    SkillName = "SQL",
                    SkillLevelId = 2,
                    Category = "BackEnd"
                },
                new Skill
                {
                    Id = 4,
                    PersonalInfoId = 1,
                    SkillName = "HTML",
                    SkillLevelId = 2,
                    Category = "FrontEnd"
                },
                new Skill
                {
                    Id = 5,
                    PersonalInfoId = 1,
                    SkillName = "React.js",
                    SkillLevelId = 1,
                    Category = "FrameWork"
                },
                new Skill
                {
                    Id = 6,
                    PersonalInfoId = 1,
                    SkillName = "CSS",
                    SkillLevelId = 1,
                    Category = "FrontEnd"
                },
                new Skill
                {
                    Id = 7,
                    PersonalInfoId = 1,
                    SkillName = "Javascript",
                    SkillLevelId = 1,
                    Category = "FrontEnd"
                },
                new Skill
                {
                    Id = 8,
                    PersonalInfoId = 1,
                    SkillName = "TypeScript",
                    SkillLevelId = 1,
                    Category = "FrontEnd"
                },
                new Skill
                {
                    Id = 9,
                    PersonalInfoId = 1,
                    SkillName = "Git",
                    SkillLevelId = 1,
                    Category = "Other"
                },
                new Skill
                {
                    Id = 10,
                    PersonalInfoId = 1,
                    SkillName = "Git Extensions",
                    SkillLevelId = 1,
                    Category = "Other"
                },
                new Skill
                {
                    Id = 11,
                    PersonalInfoId = 1,
                    SkillName = "RabbitMQ",
                    SkillLevelId = 1,
                    Category = "Other"
                },
                new Skill
                {
                    Id = 12,
                    PersonalInfoId = 1,
                    SkillName = "Elastic",
                    SkillLevelId = 1,
                    Category = "Other"
                },
                new Skill
                {
                    Id = 13,
                    PersonalInfoId = 1,
                    SkillName = "Jenkins",
                    SkillLevelId = 1,
                    Category = "Other"
                },
                new Skill
                {
                    Id = 14,
                    PersonalInfoId = 1,
                    SkillName = "Jenkins",
                    SkillLevelId = 1,
                    Category = "Other"
                },
                new Skill
                {
                    Id = 15,
                    PersonalInfoId = 1,
                    SkillName = "Laminas",
                    SkillLevelId = 1,
                    Category = "FrameWork"
                },
                new Skill
                {
                    Id = 16,
                    PersonalInfoId = 1,
                    SkillName = ".Net",
                    SkillLevelId = 1,
                    Category = "FrameWork"
                }
            );

        }
    }

}
