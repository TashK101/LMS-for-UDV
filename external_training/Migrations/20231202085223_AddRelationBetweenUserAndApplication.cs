using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace external_training.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationBetweenUserAndApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "TrainingApplications",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingApplications_UserId",
                table: "TrainingApplications",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingApplications_AspNetUsers_UserId",
                table: "TrainingApplications",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingApplications_AspNetUsers_UserId",
                table: "TrainingApplications");

            migrationBuilder.DropIndex(
                name: "IX_TrainingApplications_UserId",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TrainingApplications");
        }
    }
}
