import { Component } from '@angular/core';
import { ContratosService } from '../contratos/contratos.service';
import { ActivatedRoute } from '@angular/router';
import { Contrato, Tipo } from '../../model.component';
import { SideNavService } from '../sidenav/sidenav.service';

@Component({
    selector: 'app-datosGenerales',
    templateUrl: './datosGenerales.component.html',
    styleUrls: ['./datosGenerales.component.css']
})

export class DatosGeneralesComponent {

  public contrato: Contrato;
  public proveedores;
  public unidades;
  public tipoContrato: Tipo = null;
  public tipoProceso: Tipo = null;
  public estadoContrato: Tipo = null;

  constructor(private sidenavService:SideNavService, private contratosService: ContratosService, private activateRoute: ActivatedRoute) {
    this.unidades =
      [
        {
          ID: "1",
          nombre: "FIEC",
          descripcion: "Unidad especializada en la compra de equipos tecnologicos",
          email: "fiec@espol.edu.ec"
        },
        {
          ID: "2",
          nombre: "FICT",
          descripcion: "Unidad especializada en la compra de equipos para excavacion",
          email: "fict@espol.edu.ec"
        }
      ];
    this.proveedores =
      [
        {
          ID: 1,
          name: "Kyrios Technologies",
          ruc: 2978798798001
        },
        {
          ID: 2,
          name: "TodoTek",
          ruc: 6865645622967
        },
        {
          ID: 3,
          name: "Inacorpsa",
          ruc: 5645622967686
        },
        {
          ID: 4,
          name: "TecnoSmart Ecuador",
          ruc: 9676628656452
        }
      ];
  }

  ngOnInit() {
    let contrato;
    this.contratosService.getContrato(this.contratosService.getIdContratoActivo()).subscribe(contratoDesdeWS => contrato = contratoDesdeWS, error => console.error(error), () => this.cargarTipoContrato(contrato));
  }

  cargarTipoContrato(contrato: Contrato) {
    this.sidenavService.getTipo(contrato.qn_estadoContrato).subscribe(tipoDesdeWS => this.estadoContrato = tipoDesdeWS, error => console.error(error));
    this.sidenavService.getTipo(contrato.qn_tipoContrato).subscribe(tipoDesdeWS => this.tipoContrato = tipoDesdeWS, error => console.error(error), () => this.cargarTipoProceso(contrato));    
  }
  cargarTipoProceso(contrato: Contrato) {
    this.sidenavService.getTipo(contrato.qn_tipoProceso).subscribe(tipoDesdeWS => this.tipoProceso = tipoDesdeWS, error => console.error(error), () => this.cargarDatos(contrato));
  }
  cargarDatos(contrato: Contrato) {
    this.contrato = contrato;
  }
}
