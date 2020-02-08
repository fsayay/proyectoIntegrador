using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGContrato.Models
{
    public class ViewModel
    {
    }

    public class UserRol_View
    {
        public int ID { get; set; }
        public string NombreUsuario { get; set; }
        public string EmailUsuario { get; set; }
        public string Token { get; set; }
        public string NombreRol { get; set; }
        public string DetalleRol { get; set; }
    }

    public class Contrato_View
    {
        public int ID { get; set; }
        public string CodigoContrato { get; set; }
        public string TipoContrato { get; set; }
        public string NumeroProceso { get; set; }
        public string TipoProceso { get; set; }
        public int VigenciaContrato { get; set; }
        public DateTime FechaSuscripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public double MontoAdjudicado { get; set; }
        public bool Recurrencia { get; set; }
        public string NombreProveedor { get; set; }
        public string RucProveedor { get; set; }
        public string ObjetoContratacion { get; set; }
        public string NombreUnidad { get; set; }
        public string DescripcionUnidad { get; set; }
        public string EmailUnidad { get; set; }
        public string NombreDelegado { get; set; }
        public string NombreAdministrador { get; set; }
        public string NombreTecnicoExterno { get; set; }
        public string DetalleFormaPago { get; set; }
        public string DetalleGarantias { get; set; }
        public string ArchivoContrato { get; set; }
        public string EstadoContrato { get; set; }
        public string EstadoTransferencia { get; set; }
        public string CodigoTransferencia { get; set; }
        public DateTime FechaUltimoCambio { get; set; }

    }

    public class Solicitud_View
    {
        public int ID { get; set; }
        public string CodigoSolicitud { get; set; }
        public int CantContratos { get; set; }
        public string MotivoSolicitud { get; set; }
        public string AdmRecomendado { get; set; }
        public string EstadoSolicitud { get; set; }
        public DateTime FechaUltimoCambio { get; set; }
    }

    public class Garantia_View
    {
        public int ID { get; set; }
        public string TipoGarantia { get; set; }
        public Double ValorGarantia { get; set; }
        public string CodigoGarantia { get; set; }
        public string ProveedorGarantia { get; set; }
        public DateTime InicioGarantia { get; set; }
        public DateTime FinGarantia { get; set; }
        public string ArchivoGarantia { get; set; }
        public DateTime FechaUltimoCambio { get; set; }
        public int contratoID { get; set; }
    }

    public class FormaPago_View
    {
        public int ID { get; set; }
        public string TipoPago { get; set; }
        public string ArchivoPago { get; set; }
        public DateTime FechaUltimoCambio { get; set; }
        public int contratoID { get; set; }
    }

    public class Pago_View
    {
        public int ID { get; set; }
        public float PorcentajePago { get; set; }
        public Boolean EsAnticipo { get; set; }
        public Double MontoPago { get; set; }
        public DateTime TentativaPago { get; set; }
        public DateTime RealPago { get; set; }
        public string ComprobantePago { get; set; }
        public DateTime FechaUltimoCambio { get; set; }
        public int formaPagoID { get; set; }
    }

    public class Multa_View
    {
        public int ID { get; set; }
        public string TipoMulta { get; set; }
        public Double MontoMulta { get; set; }
        public string MotivoMulta { get; set; }
        public DateTime FechaMulta { get; set; }
        public DateTime FechaUltimoCambio { get; set; }
        public string CodigoInforme { get; set; }
        public int contratoID { get; set; }
    }

    public class Informe_View
    {
        public int ID { get; set; }
        public string TipoInforme { get; set; }
        public string CodigoInforme { get; set; }
        public DateTime FechaInforme { get; set; }
        public string ArchivoInforme { get; set; }
        public DateTime FechaUltimoCambio { get; set; }
        public int contratoID { get; set; }
    }

    public class Modificacion_View
    {
        public int ID { get; set; }
        public string TipoModificacion { get; set; }
        public string MotivoModificacion { get; set; }
        public DateTime FechaUltimoCambio { get; set; }
        public string DatoAnterior { get; set; }
        public string DalorActual { get; set; }
        public int contratoID { get; set; }
    }
    
    public class Acta_View
    {
        public int ID { get; set; }
        public string TipoActa { get; set; }
        public string CodigoActa { get; set; }
        public DateTime FechaActa { get; set; }
        public string ArchivoActa { get; set; }
        public DateTime FechaUltimoCambio { get; set; }
        public int contratoID { get; set; }
    }

    public class Entregable_view
    {
        public int ID { get; set; }
        public string TipoEntregable { get; set; }
        public int CantidadEntregable { get; set; }
        public DateTime FechaEntregable { get; set; }
        public string ArchivoEntregable { get; set; }
        public string DescripcionEntregable { get; set; }
        public DateTime FechaUltimoCambio { get; set; }
        public int contratoID { get; set; }
    }
}
