import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntregablesService } from './entregables.service';
import { ContratosService } from '../contratos/contratos.service';
import { GarantiasService } from '../garantias/garantias.service';
import { Contrato, Entregable, Tipo, Garantia, Seccion } from '../../model.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormEntregableComponent } from '../../formularios/formEntregable/form-entregable.component';
import { SideNavService } from '../sidenav/sidenav.service';

@Component({
    selector: 'app-entregables',
    templateUrl: './entregables.component.html',
    styleUrls: ['./entregables.component.css']
})
export class EntregablesComponent {

  public contrato: Contrato;
  public entregables: Entregable[];
  public nuevoEntregable: Entregable;
  public formGroup: FormGroup;
  public tiposEntregable: Tipo[];
  public seccion: Seccion;
  
  constructor(private sidenavService: SideNavService, private garantiasService: GarantiasService, private modalService: NgbModal, private contratosService: ContratosService, private entregablesService: EntregablesService, private fb: FormBuilder, private router: Router) {
    
  }

  ngOnInit() {
    let contrato;
    this.entregablesService.getEntregables(this.contratosService.getIdContratoActivo()).subscribe(contratoConEntregablesDesdeWS => contrato = contratoConEntregablesDesdeWS, error => console.error(error), () => this.llenarEntregables(contrato));
  }

  llenarEntregables(contrato: Contrato) {
    let seccion;
    this.contrato = contrato;
    console.log(this.contrato);
    this.entregables = this.contrato.entregables;
    console.log(this.entregables);
    this.sidenavService.getSeccion('25').subscribe(seccionDesdeWS => seccion = seccionDesdeWS, error => console.error(error), () => this.llenarTipos(seccion));
  }

  llenarTipos(seccion: Seccion) {
    this.tiposEntregable = seccion.tipos;
    console.log(this.tiposEntregable);

  }  

  openFormModal() {
    const modalRef = this.modalService.open(FormEntregableComponent);
    modalRef.componentInstance.entregable = null; // should be the id
    modalRef.result.then((result) => {
      this.nuevoEntregable = result;
      this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  updateEntregable(entregable: Entregable)
  {
    const modalRef = this.modalService.open(FormEntregableComponent);
    modalRef.componentInstance.entregable = entregable; // should be the id
    modalRef.result.then((result) => {
      this.nuevoEntregable = result;
      this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  insertar() {
    let contrato;
    this.nuevoEntregable.txt_archivoEntregable = this.nuevoEntregable.txt_archivoEntregable.replace(/\\/g, "/");
    this.contrato.entregables.push(this.nuevoEntregable);
    this.entregablesService.updateContrato(this.contrato).subscribe(contratoDesdeWS => contrato = contratoDesdeWS, error => console.error(error), () => this.llenarEntregables(contrato));
  }
}




