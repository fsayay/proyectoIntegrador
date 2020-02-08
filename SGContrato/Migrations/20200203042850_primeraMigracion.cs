using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Oracle.EntityFrameworkCore.Metadata;

namespace SGContrato.Migrations
{
    public partial class primeraMigracion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SG_Rols",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_rolName = table.Column<string>(nullable: true),
                    txt_rolDetaile = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Rols", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SG_Users",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_username = table.Column<string>(nullable: true),
                    txt_emailAlterno = table.Column<string>(nullable: true),
                    txt_token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SG_Solicitudes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_cantContratos = table.Column<int>(nullable: false),
                    txt_motivoSolicitud = table.Column<string>(nullable: true),
                    userID = table.Column<int>(nullable: false),
                    qn_estadoSolicitud = table.Column<int>(nullable: false),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Solicitudes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Solicitudes_SG_Users_userID",
                        column: x => x.userID,
                        principalTable: "SG_Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_UserRol",
                columns: table => new
                {
                    userID = table.Column<int>(nullable: false),
                    rolID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_UserRol", x => new { x.userID, x.rolID });
                    table.ForeignKey(
                        name: "FK_SG_UserRol_SG_Rols_rolID",
                        column: x => x.rolID,
                        principalTable: "SG_Rols",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SG_UserRol_SG_Users_userID",
                        column: x => x.userID,
                        principalTable: "SG_Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Contratos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_codigoContrato = table.Column<string>(nullable: true),
                    qn_tipoContrato = table.Column<int>(nullable: false),
                    txt_numProceso = table.Column<string>(nullable: true),
                    qn_tipoProceso = table.Column<int>(nullable: false),
                    qn_vigenciaContrato = table.Column<int>(nullable: false),
                    dt_fechaSuscripcion = table.Column<DateTime>(nullable: false),
                    dt_fechaInicio = table.Column<DateTime>(nullable: false),
                    dt_fechaFin = table.Column<DateTime>(nullable: false),
                    vm_montoAdjudicado = table.Column<double>(nullable: false),
                    bol_recurrencia = table.Column<bool>(nullable: false),
                    qn_proveedor = table.Column<int>(nullable: false),
                    txt_objetoContratacion = table.Column<string>(nullable: true),
                    qn_unidadConsolidadora = table.Column<int>(nullable: false),
                    txt_nombreDelegado = table.Column<string>(nullable: true),
                    txt_nombreAdministrador = table.Column<string>(nullable: true),
                    txt_nombreTecnicoExterno = table.Column<string>(nullable: true),
                    txt_detalleFormaPago = table.Column<string>(nullable: true),
                    txt_detalleGarantias = table.Column<string>(nullable: true),
                    txt_archivoContrato = table.Column<string>(nullable: true),
                    qn_estadoContrato = table.Column<int>(nullable: false),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    solicitudID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Contratos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Contratos_SG_Solicitudes_solicitudID",
                        column: x => x.solicitudID,
                        principalTable: "SG_Solicitudes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Actas",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoActa = table.Column<int>(nullable: false),
                    txt_codigoActa = table.Column<string>(nullable: true),
                    dt_fechaActa = table.Column<DateTime>(nullable: false),
                    txt_archivoActa = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Actas", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Actas_SG_Contratos_contratoID",
                        column: x => x.contratoID,
                        principalTable: "SG_Contratos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Entregables",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoEntregable = table.Column<int>(nullable: false),
                    qn_cantidadEntregable = table.Column<int>(nullable: false),
                    dt_fechaEntregable = table.Column<DateTime>(nullable: false),
                    txt_archivoEntregable = table.Column<string>(nullable: true),
                    txt_descripcionEntregable = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Entregables", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Entregables_SG_Contratos_contratoID",
                        column: x => x.contratoID,
                        principalTable: "SG_Contratos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_FormaPago",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoPago = table.Column<int>(nullable: false),
                    txt_archivoPago = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_FormaPago", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_FormaPago_SG_Contratos_contratoID",
                        column: x => x.contratoID,
                        principalTable: "SG_Contratos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Garantias",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoGarantia = table.Column<int>(nullable: false),
                    vm_valorGarantia = table.Column<double>(nullable: false),
                    txt_codigoGarantia = table.Column<string>(nullable: true),
                    txt_proveedorGarantia = table.Column<string>(nullable: true),
                    dt_inicioGarantia = table.Column<DateTime>(nullable: false),
                    dt_finGarantia = table.Column<DateTime>(nullable: false),
                    txt_archivoGarantia = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Garantias", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Garantias_SG_Contratos_contratoID",
                        column: x => x.contratoID,
                        principalTable: "SG_Contratos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Historial",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_seccionHistorial = table.Column<string>(nullable: true),
                    txt_accionHistorial = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Historial", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Historial_SG_Contratos_contratoID",
                        column: x => x.contratoID,
                        principalTable: "SG_Contratos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Informes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoInforme = table.Column<int>(nullable: false),
                    txt_codigoInforme = table.Column<string>(nullable: true),
                    dt_fechaInforme = table.Column<DateTime>(nullable: false),
                    txt_archivoInforme = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Informes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Informes_SG_Contratos_contratoID",
                        column: x => x.contratoID,
                        principalTable: "SG_Contratos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Modificaciones",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoModificacion = table.Column<int>(nullable: false),
                    txt_motivoModificacion = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Modificaciones", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Modificaciones_SG_Contratos_contratoID",
                        column: x => x.contratoID,
                        principalTable: "SG_Contratos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Multas",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_tipoMulta = table.Column<int>(nullable: false),
                    vm_montoMulta = table.Column<double>(nullable: false),
                    txt_motivoMulta = table.Column<string>(nullable: true),
                    dt_fechaMulta = table.Column<DateTime>(nullable: false),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    txt_codigoInforme = table.Column<string>(nullable: true),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Multas", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Multas_SG_Contratos_contratoID",
                        column: x => x.contratoID,
                        principalTable: "SG_Contratos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Vencimientos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    txt_nombreSeccion = table.Column<string>(nullable: true),
                    txt_nombreTipo = table.Column<string>(nullable: true),
                    dt_fechaVencimiento = table.Column<DateTime>(nullable: false),
                    qn_diasAnticipacion = table.Column<int>(nullable: false),
                    qn_frecuenciaAnticipacion = table.Column<int>(nullable: false),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    contratoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Vencimientos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Vencimientos_SG_Contratos_contratoID",
                        column: x => x.contratoID,
                        principalTable: "SG_Contratos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_Pagos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    qn_porcentajePago = table.Column<float>(nullable: false),
                    bol_esAnticipo = table.Column<bool>(nullable: false),
                    vm_montoPago = table.Column<double>(nullable: false),
                    dt_tentativaPago = table.Column<DateTime>(nullable: false),
                    dt_realPago = table.Column<DateTime>(nullable: false),
                    txt_comprobantePago = table.Column<string>(nullable: true),
                    dt_fechaUltimoCambio = table.Column<DateTime>(nullable: false),
                    formaPagoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_Pagos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_Pagos_SG_FormaPago_formaPagoID",
                        column: x => x.formaPagoID,
                        principalTable: "SG_FormaPago",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_FechaModificado",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    dt_fechaAnterior = table.Column<DateTime>(nullable: false),
                    dt_fechaActual = table.Column<DateTime>(nullable: false),
                    modificacionID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_FechaModificado", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_FechaModificado_SG_Modificaciones_modificacionID",
                        column: x => x.modificacionID,
                        principalTable: "SG_Modificaciones",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SG_ValorModificado",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    vm_valorAnterior = table.Column<double>(nullable: false),
                    vm_valorActual = table.Column<double>(nullable: false),
                    modificacionID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SG_ValorModificado", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SG_ValorModificado_SG_Modificaciones_modificacionID",
                        column: x => x.modificacionID,
                        principalTable: "SG_Modificaciones",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SG_Actas_contratoID",
                table: "SG_Actas",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_Contratos_solicitudID",
                table: "SG_Contratos",
                column: "solicitudID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_Entregables_contratoID",
                table: "SG_Entregables",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_FechaModificado_modificacionID",
                table: "SG_FechaModificado",
                column: "modificacionID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SG_FormaPago_contratoID",
                table: "SG_FormaPago",
                column: "contratoID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SG_Garantias_contratoID",
                table: "SG_Garantias",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_Historial_contratoID",
                table: "SG_Historial",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_Informes_contratoID",
                table: "SG_Informes",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_Modificaciones_contratoID",
                table: "SG_Modificaciones",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_Multas_contratoID",
                table: "SG_Multas",
                column: "contratoID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_Pagos_formaPagoID",
                table: "SG_Pagos",
                column: "formaPagoID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_Solicitudes_userID",
                table: "SG_Solicitudes",
                column: "userID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_UserRol_rolID",
                table: "SG_UserRol",
                column: "rolID");

            migrationBuilder.CreateIndex(
                name: "IX_SG_ValorModificado_modificacionID",
                table: "SG_ValorModificado",
                column: "modificacionID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SG_Vencimientos_contratoID",
                table: "SG_Vencimientos",
                column: "contratoID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SG_Actas");

            migrationBuilder.DropTable(
                name: "SG_Entregables");

            migrationBuilder.DropTable(
                name: "SG_FechaModificado");

            migrationBuilder.DropTable(
                name: "SG_Garantias");

            migrationBuilder.DropTable(
                name: "SG_Historial");

            migrationBuilder.DropTable(
                name: "SG_Informes");

            migrationBuilder.DropTable(
                name: "SG_Multas");

            migrationBuilder.DropTable(
                name: "SG_Pagos");

            migrationBuilder.DropTable(
                name: "SG_UserRol");

            migrationBuilder.DropTable(
                name: "SG_ValorModificado");

            migrationBuilder.DropTable(
                name: "SG_Vencimientos");

            migrationBuilder.DropTable(
                name: "SG_FormaPago");

            migrationBuilder.DropTable(
                name: "SG_Rols");

            migrationBuilder.DropTable(
                name: "SG_Modificaciones");

            migrationBuilder.DropTable(
                name: "SG_Contratos");

            migrationBuilder.DropTable(
                name: "SG_Solicitudes");

            migrationBuilder.DropTable(
                name: "SG_Users");
        }
    }
}
