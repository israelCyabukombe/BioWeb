using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BioWeb.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUrlToProject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LiveUrl",
                table: "Projects",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RepoUrl",
                table: "Projects",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LiveUrl",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "RepoUrl",
                table: "Projects");
        }
    }
}
