using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace external_training.Migrations
{
    /// <inheritdoc />
    public partial class AddManagerToApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DesiredManagerName",
                table: "TrainingApplications",
                newName: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingApplications_ManagerId",
                table: "TrainingApplications",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingApplications_AspNetUsers_ManagerId",
                table: "TrainingApplications",
                column: "ManagerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingApplications_AspNetUsers_ManagerId",
                table: "TrainingApplications");

            migrationBuilder.DropIndex(
                name: "IX_TrainingApplications_ManagerId",
                table: "TrainingApplications");

            migrationBuilder.RenameColumn(
                name: "ManagerId",
                table: "TrainingApplications",
                newName: "DesiredManagerName");
        }
    }
}
