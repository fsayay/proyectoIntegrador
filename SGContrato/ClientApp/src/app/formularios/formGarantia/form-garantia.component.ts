import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../../views/contratos/contratos.service';
import { Tipo, Seccion } from '../../model.component';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { SideNavService } from '../../views/sidenav/sidenav.service';
@Component({
  selector: 'app-form-garantia',
  templateUrl: './form-garantia.component.html'
})
export class FormGarantiaComponent {
  @Input() garantia;
  tiposGarantia: Tipo[];
  formGroup: FormGroup;
  public progress: number;
  public message: string;

  constructor(private http: HttpClient, private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private cs: ContratosService, private sidenavService: SideNavService) {
    let seccion;
    this.sidenavService.getSeccion('2').subscribe(tiposDesdeWS => seccion = tiposDesdeWS, error => console.error(error), () => this.llenarTabla(seccion));
  }

  ngOnInit() {
    if (this.garantia == null) {
      this.createForm();
    }
    else
      this.updateForm();
  }

  llenarTabla(seccion: Seccion) {
    this.tiposGarantia = seccion.tipos;
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_tipoGarantia: [0, Validators.required],
      vm_valorGarantia: [0, Validators.required],
      txt_codigoGarantia: ['', Validators.required],
      txt_proveedorGarantia: ['', Validators.required],
      dt_inicioGarantia: ['', Validators.required],
      dt_finGarantia: ['', Validators.required],
      txt_archivoGarantia: ['', Validators.required],
      dt_fechaUltimoCambio: today,
      contratoID: this.cs.getIdContratoActivo()
    });
  }

  private updateForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: this.garantia.ID,
      qn_tipoGarantia: this.garantia.qn_tipoGarantia,
      vm_valorGarantia: this.garantia.vm_valorGarantia,
      txt_codigoGarantia: this.garantia.txt_codigoGarantia,
      txt_proveedorGarantia: this.garantia.txt_proveedor,
      dt_inicioGarantia: this.garantia.dt_inicioGarantia,
      dt_finGarantia: this.garantia.dt_finGarantia,
      txt_archivoGarantia: this.garantia.txt_archivoGarantia,
      dt_fechaUltimoCambio: today,
      contratoID: this.cs.getIdContratoActivo()
    });
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
    this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
