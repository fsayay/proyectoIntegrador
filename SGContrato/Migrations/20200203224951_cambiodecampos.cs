using Microsoft.EntityFrameworkCore.Migrations;

namespace SGContrato.Migrations
{
    public partial class cambiodecampos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SG_Solicitudes_SG_Users_userID",
                table: "SG_Solicitudes");

            migrationBuilder.DropIndex(
                name: "IX_SG_Solicitudes_userID",
                table: "SG_Solicitudes");

            migrationBuilder.DropColumn(
                name: "userID",
                table: "SG_Solicitudes");

            migrationBuilder.AddColumn<string>(
                name: "txt_admRecomendado",
                table: "SG_Solicitudes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "txt_admRecomendado",
                table: "SG_Solicitudes");

            migrationBuilder.AddColumn<int>(
                name: "userID",
                table: "SG_Solicitudes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SG_Solicitudes_userID",
                table: "SG_Solicitudes",
                column: "userID");

            migrationBuilder.AddForeignKey(
                name: "FK_SG_Solicitudes_SG_Users_userID",
                table: "SG_Solicitudes",
                column: "userID",
                principalTable: "SG_Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
