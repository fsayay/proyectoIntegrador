import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contrato, Tipo, Seccion } from '../../model.component';
import { ContratosService } from '../contratos/contratos.service';
import { Router } from '@angular/router';
import { ActasService } from '../actas/actas.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  public contratos: Contrato[];
  public contratosFiltrados: Contrato[]=[];
  public formGroup: FormGroup;
  public tipoContrato: Tipo[];
  public estado: Tipo[];
  seccionContrato: Seccion;
  seccionEstado: Seccion;

  constructor(private formBuilder: FormBuilder, private actasService: ActasService, private contratosService: ContratosService, private router: Router) {
  
  }

  ngOnInit() {
    
    this.createForm();
    this.actasService.getTipoActa('1').subscribe(tiposDesdeWS => this.seccionContrato = tiposDesdeWS, error => console.error(error), () => this.llenarEstado());
    
    
  }

  llenarEstado() {
    this.actasService.getTipoActa('23').subscribe(tiposDesdeWS => this.seccionEstado = tiposDesdeWS, error => console.error(error), () => this.llenarDatos());
  }

  llenarDatos() {
    this.contratosService.getContratos().subscribe(contratosDesdeWS => this.contratos = contratosDesdeWS, error => console.error(error), () => this.llenarTabla());
  }

  llenarTabla() {
    this.tipoContrato = this.seccionContrato.tipos;
    this.estado = this.seccionEstado.tipos;
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      codigoContrato: [''],
      adminContrato: [''],
      estadoContrato: ['', Validators.required],
      codigoProceso: [''],
      proveedor: [''],
      tipoContrato: [''],
      fechaSubs1: ['', Validators.required],
      fechaSubs2: ['', Validators.required],
      fechaInicio1: [''],
      fechaInicio2: [''],
      fechaFin1: [''],
      fechaFin2: ['']
    });
  }

  private submitForm() {
    console.log(this.formGroup.get('estadoContrato').value);
    this.filtrar();
  }

  mostrarDetalle(contratoId: string) {
    this.contratosService.setContratoId(contratoId);
    this.router.navigate(["/datosGenerales"]);
  }

  mostrarHistorial(contratoId: string) {
    this.contratosService.setContratoId(contratoId);
    this.router.navigate(["/historial"]);
  }

  filtrar() {
    if (this.formGroup.get('estadoContrato').value!= 0) {
      this.contratos.forEach(x => {
        if (x.qn_estadoContrato == this.formGroup.get('estadoContrato').value) {
          this.contratosFiltrados.push(x);
          console.log(this.contratosFiltrados);
        }
          
      });
    }
  }

}
