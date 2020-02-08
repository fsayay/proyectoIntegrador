import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../../views/contratos/contratos.service';
import { Tipo, Seccion } from '../../model.component';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { SideNavService } from '../../views/sidenav/sidenav.service';
@Component({
  selector: 'app-form-entregable',
  templateUrl: './form-entregable.component.html'
})
export class FormEntregableComponent {
  @Input() entregable;
  tiposEntregable: Tipo[];
  formGroup: FormGroup;
  public progress: number;
  public message: string;

  constructor(private http: HttpClient, private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private cs: ContratosService, private sidenavService: SideNavService) {
    let seccion;
    this.sidenavService.getSeccion('25').subscribe(tiposDesdeWS => seccion = tiposDesdeWS, error => console.error(error), () => this.llenarTabla(seccion));
  }

  ngOnInit() {
    if (this.entregable == null) {
      this.createForm();
    }
    else
      this.updateForm();
  }

  llenarTabla(seccion: Seccion) {
    this.tiposEntregable = seccion.tipos;
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_tipoEntregable: [0, Validators.required],
      qn_cantidadEntregable: [0, Validators.required],
      dt_fechaEntregable: ['', Validators.required],
      txt_archivoEntregable: ['', Validators.required],
      txt_descripcionEntregable: ['', Validators.required],
      dt_fechaUltimoCambio: today,
      contratoID: this.cs.getIdContratoActivo()
    });
  }

  private updateForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: this.entregable.ID,
      qn_tipoEntregable: this.entregable.qn_tipoEntregable,
      qn_cantidadEntregable: this.entregable.qn_cantidadEntregable,
      dt_fechaEntregable: this.entregable.dt_fechaEntregable,
      txt_archivoEntregable: this.entregable.txt_archivoEntregable,
      txt_descripcionEntregable: this.entregable.txt_descripcionEntregable,
      dt_fechaUltimoCambio: today,
      contratoID: this.entregable.contratoID
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






  

