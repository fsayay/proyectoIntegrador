using Microsoft.EntityFrameworkCore.Migrations;

namespace SGContrato.Migrations
{
    public partial class addColumnsContrato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SG_Contratos_SG_Solicitudes_solicitudID",
                table: "SG_Contratos");

            migrationBuilder.DropIndex(
                name: "IX_SG_Contratos_solicitudID",
                table: "SG_Contratos");

            migrationBuilder.RenameColumn(
                name: "solicitudID",
                table: "SG_Contratos",
                newName: "qn_enTransferencia");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "qn_enTransferencia",
                table: "SG_Contratos",
                newName: "solicitudID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_Contratos_solicitudID",
                table: "SG_Contratos",
                column: "solicitudID");

            migrationBuilder.AddForeignKey(
                name: "FK_SG_Contratos_SG_Solicitudes_solicitudID",
                table: "SG_Contratos",
                column: "solicitudID",
                principalTable: "SG_Solicitudes",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
