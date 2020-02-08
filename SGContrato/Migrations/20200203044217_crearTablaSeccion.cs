using Microsoft.EntityFrameworkCore.Migrations;
using Oracle.EntityFrameworkCore.Metadata;

namespace SGContrato.Migrations
{
    public partial class crearTablaSeccion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SG_Secciones",
                columns: table => new
                {
                    seccionID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_nombreSeccion = table.Column<string>(nullable: true),
                    txt_detalleSeccion = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Secciones", x => x.seccionID);
                });

            migrationBuilder.CreateTable(
                name: "SG_Tipos",
                columns: table => new
                {
                    tipoID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_nombreTipo = table.Column<string>(nullable: true),
                    txt_detalleTipo = table.Column<string>(nullable: true),
                    seccionID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Tipos", x => x.tipoID);
                    table.ForeignKey(
                        name: "FK_SG_Tipos_SG_Secciones_seccionID",
                        column: x => x.seccionID,
                        principalTable: "SG_Secciones",
                        principalColumn: "seccionID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SG_Tipos_seccionID",
                table: "SG_Tipos",
                column: "seccionID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SG_Tipos");

            migrationBuilder.DropTable(
                name: "SG_Secciones");
        }
    }
}
