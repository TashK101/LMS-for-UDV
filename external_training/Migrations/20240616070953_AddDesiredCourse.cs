using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace external_training.Migrations
{
    /// <inheritdoc />
    public partial class AddDesiredCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DesiredCourses",
                columns: table => new
                {
                    DesiredCourseId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsTrainingOnline = table.Column<bool>(type: "boolean", nullable: false),
                    IsCorporateTraining = table.Column<bool>(type: "boolean", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    TrainingCenter = table.Column<string>(type: "text", nullable: false),
                    CostPerParticipant = table.Column<decimal>(type: "numeric", nullable: false),
                    TotalCost = table.Column<decimal>(type: "numeric", nullable: false),
                    Begin = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TrainingApplicationId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DesiredCourses", x => x.DesiredCourseId);
                    table.ForeignKey(
                        name: "FK_DesiredCourses_TrainingApplications_TrainingApplicationId",
                        column: x => x.TrainingApplicationId,
                        principalTable: "TrainingApplications",
                        principalColumn: "TrainingApplicationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DesiredCourses_TrainingApplicationId",
                table: "DesiredCourses",
                column: "TrainingApplicationId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DesiredCourses");
        }
    }
}
