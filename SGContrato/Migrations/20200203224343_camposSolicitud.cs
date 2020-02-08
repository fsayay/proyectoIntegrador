using Microsoft.EntityFrameworkCore.Migrations;

namespace SGContrato.Migrations
{
    public partial class camposSolicitud : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "qn_enTransferencia",
                table: "SG_Contratos",
                newName: "qn_estadoTransferencia");

            migrationBuilder.AddColumn<string>(
                name: "txt_codigoSolicitud",
                table: "SG_Solicitudes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "txt_codigoTransferencia",
                table: "SG_Contratos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "txt_codigoSolicitud",
                table: "SG_Solicitudes");

            migrationBuilder.DropColumn(
                name: "txt_codigoTransferencia",
                table: "SG_Contratos");

            migrationBuilder.RenameColumn(
                name: "qn_estadoTransferencia",
                table: "SG_Contratos",
                newName: "qn_enTransferencia");
        }
    }
}
