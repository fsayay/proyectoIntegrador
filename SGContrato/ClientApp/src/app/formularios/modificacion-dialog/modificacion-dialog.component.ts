import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tipo, Seccion, Contrato } from '../../model.component';
import { SideNavService } from '../../views/sidenav/sidenav.service';
import { ContratosService } from '../../views/contratos/contratos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modificacion-dialog',
  templateUrl: './modificacion-dialog.component.html',
  styleUrls: ['./modificacion-dialog.component.css']
})
export class ModificacionDialogComponent implements OnInit {
  contrato: Contrato;
  seccion: Seccion;
  formGroup: FormGroup;
  tiposModificacion: Tipo[];

  constructor(private datePipe: DatePipe, private cs: ContratosService, private sidenavService: SideNavService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ModificacionDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    let seccion;
    this.sidenavService.getSeccion('26').subscribe(tiposDesdeWS => seccion = tiposDesdeWS, error => console.error(error), () => this.llenarTabla(seccion));
  }

  ngOnInit() {
    this.createForm();    
  }
  
  llenarTabla(seccion: Seccion) {
    this.tiposModificacion = seccion.tipos;
    this.cs.getContrato(this.cs.getIdContratoActivo()).subscribe(contratoDesdeWS => this.contrato = contratoDesdeWS, error => console.error(error), () => this.cargarPagina());
  }

  cargarPagina() {
    this.formGroup.get('vm_valorAnterior').setValue(this.contrato.vm_montoAdjudicado);
    this.formGroup.get('dt_fechaAnterior').setValue(this.datePipe.transform(this.contrato.dt_fechaFin, "dd-MM-yyyy"));
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_tipoModificacion: [0, Validators.required],
      txt_motivoModificacion: ['', Validators.required],
      dt_fechaUltimoCambio: today,
      vm_valorAnterior: "",
      vm_valorActual: ['', Validators.required],
      dt_fechaAnterior: '',
      dt_fechaActual: ['', Validators.required],
    });
  };

  save() {
    this.dialogRef.close(this.formGroup.value);
  }

  close() {
    this.dialogRef.close();
  }

}
