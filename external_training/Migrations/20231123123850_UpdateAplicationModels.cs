using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace external_training.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAplicationModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TraineesNames",
                table: "TrainingApplications",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "DesiredTrainingDate",
                table: "TrainingApplications",
                newName: "DesiredEnd");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "SelectedTrainingCourses",
                newName: "ParticipantsNames");

            migrationBuilder.RenameColumn(
                name: "IsCourseOnline",
                table: "SelectedTrainingCourses",
                newName: "IsTrainingOnline");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationNotes",
                table: "TrainingApplications",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "TrainingApplications",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DesiredBegin",
                table: "TrainingApplications",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DesiredManagerName",
                table: "TrainingApplications",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PlannedParticipantsNames",
                table: "TrainingApplications",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Begin",
                table: "SelectedTrainingCourses",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "EducationalCenter",
                table: "SelectedTrainingCourses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "End",
                table: "SelectedTrainingCourses",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsCorporateTraining",
                table: "SelectedTrainingCourses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ParticipantsCount",
                table: "SelectedTrainingCourses",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationNotes",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "DesiredBegin",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "DesiredManagerName",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "PlannedParticipantsNames",
                table: "TrainingApplications");

            migrationBuilder.DropColumn(
                name: "Begin",
                table: "SelectedTrainingCourses");

            migrationBuilder.DropColumn(
                name: "EducationalCenter",
                table: "SelectedTrainingCourses");

            migrationBuilder.DropColumn(
                name: "End",
                table: "SelectedTrainingCourses");

            migrationBuilder.DropColumn(
                name: "IsCorporateTraining",
                table: "SelectedTrainingCourses");

            migrationBuilder.DropColumn(
                name: "ParticipantsCount",
                table: "SelectedTrainingCourses");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "TrainingApplications",
                newName: "TraineesNames");

            migrationBuilder.RenameColumn(
                name: "DesiredEnd",
                table: "TrainingApplications",
                newName: "DesiredTrainingDate");

            migrationBuilder.RenameColumn(
                name: "ParticipantsNames",
                table: "SelectedTrainingCourses",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "IsTrainingOnline",
                table: "SelectedTrainingCourses",
                newName: "IsCourseOnline");
        }
    }
}
