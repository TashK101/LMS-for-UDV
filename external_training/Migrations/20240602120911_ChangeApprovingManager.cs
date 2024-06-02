using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace external_training.Migrations
{
    /// <inheritdoc />
    public partial class ChangeApprovingManager : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SoloAppointmentId",
                table: "ApprovingManagers",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "SoloOrgUnitName",
                table: "ApprovingManagers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SoloPostName",
                table: "ApprovingManagers",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoloAppointmentId",
                table: "ApprovingManagers");

            migrationBuilder.DropColumn(
                name: "SoloOrgUnitName",
                table: "ApprovingManagers");

            migrationBuilder.DropColumn(
                name: "SoloPostName",
                table: "ApprovingManagers");
        }
    }
}
