using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace external_training.Migrations
{
    /// <inheritdoc />
    public partial class BeginIntegration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_ManagerId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Teams_TeamId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingApplications_AspNetUsers_ManagerId",
                table: "TrainingApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingApplications_Departments_DepartmentId",
                table: "TrainingApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingApplications_Teams_TeamId",
                table: "TrainingApplications");

            migrationBuilder.DropTable(
                name: "SelectedTrainingCourses");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropIndex(
                name: "IX_TrainingApplications_DepartmentId",
                table: "TrainingApplications");

            migrationBuilder.DropIndex(
                name: "IX_TrainingApplications_ManagerId",
                table: "TrainingApplications");

            migrationBuilder.DropIndex(
                name: "IX_TrainingApplications_TeamId",
                table: "TrainingApplications");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ManagerId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_TeamId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "DesiredBegin",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "DesiredEnd",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "EstimatedCostPerParticipant",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "IsApprovedByManager",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "IsCorporateTraining",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "IsTrainingOnline",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "PlannedParticipantsCount",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "PlannedParticipantsNames",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<Guid>(
                name: "SoloDocumentId",
                table: "TrainingApplications",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Department",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "SoloPersonId",
                table: "AspNetUsers",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Team",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "ApplicationParticipants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SoloPersonId = table.Column<Guid>(type: "uuid", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    MiddleName = table.Column<string>(type: "text", nullable: false),
                    TrainingApplicationId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationParticipants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicationParticipants_TrainingApplications_TrainingApplic~",
                        column: x => x.TrainingApplicationId,
                        principalTable: "TrainingApplications",
                        principalColumn: "TrainingApplicationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApprovingManagers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SoloPersonId = table.Column<Guid>(type: "uuid", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    MiddleName = table.Column<string>(type: "text", nullable: false),
                    TrainingApplicationId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovingManagers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApprovingManagers_TrainingApplications_TrainingApplicationId",
                        column: x => x.TrainingApplicationId,
                        principalTable: "TrainingApplications",
                        principalColumn: "TrainingApplicationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "integer", nullable: false)
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
                    table.PrimaryKey("PK_Courses", x => x.CourseId);
                    table.ForeignKey(
                        name: "FK_Courses_TrainingApplications_TrainingApplicationId",
                        column: x => x.TrainingApplicationId,
                        principalTable: "TrainingApplications",
                        principalColumn: "TrainingApplicationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationParticipants_TrainingApplicationId",
                table: "ApplicationParticipants",
                column: "TrainingApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovingManagers_TrainingApplicationId",
                table: "ApprovingManagers",
                column: "TrainingApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_TrainingApplicationId",
                table: "Courses",
                column: "TrainingApplicationId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationParticipants");

            migrationBuilder.DropTable(
                name: "ApprovingManagers");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropColumn(
                name: "SoloDocumentId",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "Department",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SoloPersonId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Team",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                table: "TrainingApplications",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DesiredBegin",
                table: "TrainingApplications",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DesiredEnd",
                table: "TrainingApplications",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "EstimatedCostPerParticipant",
                table: "TrainingApplications",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "IsApprovedByManager",
                table: "TrainingApplications",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsCorporateTraining",
                table: "TrainingApplications",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsTrainingOnline",
                table: "TrainingApplications",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ManagerId",
                table: "TrainingApplications",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PlannedParticipantsCount",
                table: "TrainingApplications",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PlannedParticipantsNames",
                table: "TrainingApplications",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "TrainingApplications",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ManagerId",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    DepartmentId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.DepartmentId);
                });

            migrationBuilder.CreateTable(
                name: "SelectedTrainingCourses",
                columns: table => new
                {
                    SelectedTrainingCourseId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TrainingApplicationId = table.Column<int>(type: "integer", nullable: false),
                    Begin = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CostPerParticipant = table.Column<decimal>(type: "numeric", nullable: false),
                    CourseName = table.Column<string>(type: "text", nullable: false),
                    EducationalCenter = table.Column<string>(type: "text", nullable: false),
                    End = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsCorporateTraining = table.Column<bool>(type: "boolean", nullable: false),
                    IsTrainingOnline = table.Column<bool>(type: "boolean", nullable: false),
                    ParticipantsCount = table.Column<int>(type: "integer", nullable: false),
                    ParticipantsNames = table.Column<string>(type: "text", nullable: false),
                    TotalCost = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelectedTrainingCourses", x => x.SelectedTrainingCourseId);
                    table.ForeignKey(
                        name: "FK_SelectedTrainingCourses_TrainingApplications_TrainingApplic~",
                        column: x => x.TrainingApplicationId,
                        principalTable: "TrainingApplications",
                        principalColumn: "TrainingApplicationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    TeamId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DepartmentId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.TeamId);
                    table.ForeignKey(
                        name: "FK_Teams_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "DepartmentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingApplications_DepartmentId",
                table: "TrainingApplications",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingApplications_ManagerId",
                table: "TrainingApplications",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingApplications_TeamId",
                table: "TrainingApplications",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ManagerId",
                table: "AspNetUsers",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_TeamId",
                table: "AspNetUsers",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_SelectedTrainingCourses_TrainingApplicationId",
                table: "SelectedTrainingCourses",
                column: "TrainingApplicationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_DepartmentId",
                table: "Teams",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_ManagerId",
                table: "AspNetUsers",
                column: "ManagerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Teams_TeamId",
                table: "AspNetUsers",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingApplications_AspNetUsers_ManagerId",
                table: "TrainingApplications",
                column: "ManagerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingApplications_Departments_DepartmentId",
                table: "TrainingApplications",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "DepartmentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingApplications_Teams_TeamId",
                table: "TrainingApplications",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
