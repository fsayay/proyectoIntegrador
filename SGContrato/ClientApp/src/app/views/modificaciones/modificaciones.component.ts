import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContratosService } from '../contratos/contratos.service';
import { GarantiasService } from '../garantias/garantias.service';
import { Contrato } from '../../model.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modificacion } from '../../model.component';
import { ModificacionesService } from './modificaciones.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ModificacionDialogComponent } from '../../formularios/modificacion-dialog/modificacion-dialog.component';


@Component({
    selector: 'app-modificaciones',
    templateUrl: './modificaciones.component.html',
    styleUrls: ['./modificaciones.component.css']
})
export class ModificacionesComponent {
  public modificaciones: Modificacion[];
  public contrato: Contrato;
  public nuevaModificacion: Modificacion;
  public formGroup: FormGroup;
  public formValor: FormGroup;
  public formFecha: FormGroup;

  constructor(private dialog: MatDialog, private garantiasService: GarantiasService, private modalService: NgbModal, private contratosService: ContratosService, private modificacionesService: ModificacionesService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.modificacionesService.getModificaciones(this.contratosService.getIdContratoActivo()).subscribe(contratoConModificacionesDesdeWS => this.contrato = contratoConModificacionesDesdeWS, error => console.error(error), () => this.llenarTabla());
  }

  llenarTabla() {
    this.modificaciones = this.contrato.modificaciones;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    this.dialog.open(ModificacionDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(ModificacionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output: ", data)
    );
  }

}
