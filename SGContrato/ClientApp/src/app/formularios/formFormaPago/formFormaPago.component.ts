import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../../views/contratos/contratos.service';
import { Tipo, Seccion, FormaPago } from '../../model.component';
import { GarantiasService } from '../../views/garantias/garantias.service';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { PagosService } from '../../views/pagos/pagos.service';
import { SideNavService } from '../../views/sidenav/sidenav.service';
@Component({
  selector: 'app-formFormaPago',
  templateUrl: './formFormaPago.component.html'
})
export class FormFormaPagoComponent {
  @Input() pagos: FormaPago;

  public formaPagoID: number;
  public progress: number;
  public message: string;  
  public tiposPago: Tipo[];
  formGroup: FormGroup;

  constructor(private sidenavService: SideNavService, private http: HttpClient, private activeModal: NgbActiveModal,private pagosService: PagosService, private formBuilder: FormBuilder, private contratosService: ContratosService) {
    let seccion;
    this.createForm();
    this.sidenavService.getSeccion('21').subscribe(tiposDesdeWS => seccion = tiposDesdeWS, error => console.error(error), () => this.llenarTabla(seccion));
  }

  llenarTabla(seccion: Seccion) {
    this.tiposPago = seccion.tipos;
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_tipoPago: [0, Validators.required],
      txt_archivoPago: ['', Validators.required],
      dt_fechaUltimoCambio: today,
      contratoID: this.contratosService.getIdContratoActivo(),
      pagos: this.formBuilder.array([])      
    });
  }

  agregarPago() {
    let pagoArr = this.formGroup.get('pagos') as FormArray;
    let pagoFormGroup = this.construirFormPago();
    pagoArr.push(pagoFormGroup);
  }

  construirFormPago() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    return this.formBuilder.group({
      ID: 0,
      qn_porcentajePago: [0, Validators.required],
      bol_esAnticipo: false,
      vm_montoPago: [0, Validators.required],
      dt_tentativaPago: ['', Validators.required],
      dt_realPago: today, 
      txt_comprobantePago: null,
      dt_fechaUltimoCambio: today,
      formaPagoID: 0
    })
  }

 upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }

  private submitForm() {
    console.log(this.formGroup.value);
    this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  mychange(val) {
    console.log(val); // updated value
  }
}

  


