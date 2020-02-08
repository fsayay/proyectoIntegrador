import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActasService } from './actas.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Acta, Tipo, Contrato, Historial, Seccion } from '../../model.component';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../contratos/contratos.service';
import { FormActaComponent } from '../../formularios/formActa/form-acta.component';
import { HistorialService } from '../historial/historial.service';
import { SideNavService } from '../sidenav/sidenav.service';


@Component({
    selector: 'app-actas',
    templateUrl: './actas.component.html',
    styleUrls: ['./actas.component.css']
})
export class ActasComponent {

  public historial: Historial;
  public seccion: Seccion;
  public contrato: Contrato = null;
  public actas: Acta[];
  public tiposActa: Tipo;
  public nuevaActa: Acta;

  constructor(private historialService: HistorialService, private sidenavService: SideNavService, private modalService: NgbModal, private contratosService: ContratosService, private actasService: ActasService, private fb: FormBuilder, private router: Router) {
    
  }

  ngOnInit() {
    this.cargarDatos();
  }

  public cargarDatos() {
    if (this.contrato == null)
      this.actasService.getActas(this.contratosService.getIdContratoActivo()).subscribe(contratoConActasDesdeWS => this.contrato = contratoConActasDesdeWS, error => console.error(error), () => this.llenartabla());
    this.llenartabla();
  }

  public llenartabla() {
    this.actas = this.contrato.actas;

  }
  updateActa(acta: Acta) {
    const modalRef = this.modalService.open(FormActaComponent);
    modalRef.componentInstance.acta = acta;
    modalRef.result.then((result) => {
      acta = result;
      this.insertar(acta);
    }).catch((error) => {
      console.log(error);
    });
  }

  openFormModal() {
    let acta: Acta;
    const modalRef = this.modalService.open(FormActaComponent);
    modalRef.componentInstance.acta = null;
    modalRef.result.then((result) => {
      acta = result;
      this.insertar(acta);
    }).catch((error) => {
      console.log(error);
    });
  }

  insertar(acta: Acta) {
    acta.txt_archivoActa = acta.txt_archivoActa.replace(/\\/g, "/");
    this.contrato.actas.push(acta);

    console.log(this.contrato);
    this.actasService.updateContrato(this.contrato).subscribe(contratoDesdeWS => this.contrato = contratoDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  generarHistorial() {
    let accion: string = '';
    accion = "Se guardo el acta " + this.nuevaActa.txt_codigoActa + " de tipo " + this.nuevaActa.qn_tipoActa;
    this.guardarHistorial(accion);
    this.contrato.historial.push(this.historial);

    this.historialService.insertHistorial(this.contrato).subscribe(contratoDesdeWS => this.contrato = contratoDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  guardarHistorial(accion: string) {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.historial.ID = 0;
    this.historial.txt_seccionHistorial = 'Actas';
    this.historial.txt_accionHistorial = accion;
    this.historial.dt_fechaUltimoCambio = today;
    this.historial.contratoID = this.contrato.ID;
  }  
}




