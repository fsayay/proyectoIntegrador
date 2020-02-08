import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GarantiasService } from '../garantias/garantias.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContratosService } from '../contratos/contratos.service';
import { Contrato, Garantia} from '../../model.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGarantiaComponent } from '../../formularios/formGarantia/form-garantia.component';

@Component({
    selector: 'app-garantias',
    templateUrl: './garantias.component.html',
    styleUrls: ['./garantias.component.css']
})
export class GarantiasComponent implements OnInit {

 

  public contrato: Contrato;
  public garantias: Garantia[];
  public formGroup: FormGroup;
  public nuevaGarantia: Garantia;
  public editGarantia: Garantia;
  

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private http: HttpClient, private contratosService: ContratosService, private garantiasService: GarantiasService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.garantiasService.getGarantias(this.contratosService.getIdContratoActivo()).subscribe(contratoConGarantiasDesdeWS => this.contrato = contratoConGarantiasDesdeWS, error => console.error(error), () => this.cargarDatos());
    
  }

  cargarDatos() {
    this.garantias = this.contrato.garantias;
  }

  public agregarGarantia() {
    const modalRef = this.modalService.open(FormGarantiaComponent);
    modalRef.componentInstance.garantia = null; // should be the id
    modalRef.result.then((result) => {
      this.nuevaGarantia = result;
      this.insertar();
    }).catch((error) => {
      console.log(error);
    });
  }

  public editarGarantia(garantia: Garantia) {
    const modalRef = this.modalService.open(FormGarantiaComponent);
    modalRef.componentInstance.garantia = garantia; // should be the id
    modalRef.result.then((result) => {
      this.editGarantia = result;
      this.editar();
    }).catch((error) => {
      console.log(error);
    });
  }

  public editar() {
    this.contrato.garantias.forEach(x => {
      if (x.ID == this.editGarantia.ID)
        x = this.editGarantia;
    });
    this.guardar();
  }


  public insertar() {
    this.nuevaGarantia.txt_archivoGarantia = this.nuevaGarantia.txt_archivoGarantia.replace(/\\/g, "/");
    this.contrato.garantias.push(this.nuevaGarantia);
    this.guardar();
  }

  public guardar() {
    this.contratosService.updateContrato(this.contrato).subscribe(contratoDesdeWS => this.contrato = contratoDesdeWS, error => console.error(error), () => this.cargarDatos());
  }
}

