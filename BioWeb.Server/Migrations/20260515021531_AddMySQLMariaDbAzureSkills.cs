using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BioWeb.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddMySQLMariaDbAzureSkills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "Category", "PersonalInfoId", "SkillLevelId", "SkillName" },
                values: new object[,]
                {
                    { 16, "BackEnd", 1, 2, "MySQL" },
                    { 17, "BackEnd", 1, 2, "MariaDB" },
                    { 18, "Other", 1, 2, "Azure" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: 18);
        }
    }
}
