using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SGContrato.Models;

namespace SGContrato.Models
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRol>().HasKey(sc => new { sc.userID, sc.rolID });            
        }

        //Models
        public DbSet<Pago> SG_Pagos { get; set; }
        public DbSet<FormaPago> SG_FormaPago { get; set; }
        public DbSet<Contrato> SG_Contratos { get; set; }
        public DbSet<Acta> SG_Actas { get; set; }
        public DbSet<Garantia> SG_Garantias { get; set; }
        public DbSet<Informe> SG_Informes { get; set; }
        public DbSet<Entregable> SG_Entregables { get; set; }
        public DbSet<Multa> SG_Multas { get; set; }
        public DbSet<Modificacion> SG_Modificaciones { get; set; }
        public DbSet<FechaModificado> SG_FechaModificado { get; set; }
        public DbSet<ValorModificado> SG_ValorModificado { get; set; }
        public DbSet<Historial> SG_Historial { get; set; }
        public DbSet<Solicitud> SG_Solicitudes { get; set; }
        public DbSet<Vencimiento> SG_Vencimientos { get; set; }
        public DbSet<User> SG_Users { get; set; }
        public DbSet<Rol> SG_Rols { get; set; }
        public DbSet<UserRol> SG_UserRol { get; set; }
        public DbSet<Tipo> SG_Tipos { get; set; }
        public DbSet<Seccion> SG_Secciones { get; set; } 

        //Views
        public DbSet<UserRol_View> userRol_Views { get; set; }
        public DbSet<Contrato_View> contrato_Views { get; set; }
        public DbSet<Solicitud_View> solicitud_Views { get; set; }
        public DbSet<Garantia_View> garantia_Views { get; set; }
        public DbSet<FormaPago_View> formaPago_Views { get; set; }
        public DbSet<Pago_View> pago_Views { get; set; }
        public DbSet<Multa_View> multa_Views { get; set; }
        public DbSet<Informe_View> informe_Views { get; set; }
        public DbSet<Modificacion_View> modificacion_Views { get; set; }
        public DbSet<Acta_View> acta_Views { get; set; }
        public DbSet<Entregable_view> entregable_Views { get; set; }
    }
}
