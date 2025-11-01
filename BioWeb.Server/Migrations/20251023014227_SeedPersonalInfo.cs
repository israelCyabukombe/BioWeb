using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BioWeb.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedPersonalInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PersonalInfos",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "ProfilePhotoUrl", "SummaryText" },
                values: new object[] { 1, "israel.cyabu93@gmail.com", "Israel", "Cyabukombe", "/images/IMG_0002.jpg", "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PersonalInfos",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
