import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../../views/contratos/contratos.service';
import { Tipo, Seccion } from '../../model.component';
import { InformesService } from '../../views/informes/informes.service';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { SideNavService } from '../../views/sidenav/sidenav.service';
@Component({
  selector: 'app-form-informe',
  templateUrl: './form-informe.component.html'
})
export class FormInformeComponent {
  @Input() informe;
  tiposInforme: Tipo[];
  public progress: number;
  public message: string;
  formGroup: FormGroup;

  constructor(private sidenavService: SideNavService, private http: HttpClient, private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private fb: FormBuilder, public cs: ContratosService, public is: InformesService) {
    let seccion
    this.sidenavService.getSeccion('27').subscribe(tiposDesdeWS => seccion = tiposDesdeWS, error => console.error(error), () => this.llenarTabla(seccion));    
  }

  ngOnInit() {
    if (this.informe == null)
      this.createForm();
    else
      this.updateForm();
  }

  llenarTabla(seccion: Seccion) {
    this.tiposInforme = seccion.tipos;
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_tipoInforme: [0, Validators.required],
      txt_codigoInforme: ['', Validators.required],
      dt_fechaInforme: ['', Validators.required],
      txt_archivoInforme: ['', Validators.required],
      dt_fechaUltimoCambio: today,
      contratoID: this.cs.getIdContratoActivo()
    });
  }

  private updateForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: this.informe.ID,
      qn_tipoInforme: this.informe.qn_tipoInforme,
      txt_codigoInforme: this.informe.txt_codigoInforme,
      dt_fechaInforme: this.informe.dt_fechaInforme,
      txt_archivoInforme: this.informe.txt_archivoInforme,
      dt_fechaUltimoCambio: today,
      contratoID: this.informe.contratoID
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
