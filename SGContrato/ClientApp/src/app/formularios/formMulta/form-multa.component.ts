import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, Renderer2  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../../views/contratos/contratos.service';
import { Tipo, Seccion } from '../../model.component';
import { MultasService } from '../../views/multas/multas.service';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { FormInformeMultaComponent } from '../formInformeMulta/formInformeMulta.component';
import { SideNavService } from '../../views/sidenav/sidenav.service';
@Component({
  selector: 'app-form-multa',
  templateUrl: './form-multa.component.html'
})
export class FormMultaComponent {
  @Input() tipoId: number;
  @ViewChild("informeMulta", { static: false }) informeMulta: ElementRef;
  tiposMulta: Tipo[];
  public progress: number;
  public message: string;
  formGroup: FormGroup;
  txt_codigoInforme: string;

  constructor(private sidenavService: SideNavService, private http: HttpClient, private modalService: NgbModal, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private fb: FormBuilder, public cs: ContratosService, public ms: MultasService, private renderer: Renderer2) {
    let seccion;
    this.createForm();
    this.sidenavService.getSeccion('22').subscribe(tiposDesdeWS => seccion = tiposDesdeWS, error => console.error(error), () => this.llenarTabla(seccion));    
  }

  llenarTabla(seccion: Seccion) {
    this.tiposMulta = seccion.tipos;
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_tipoMulta: [0, Validators.required],
      vm_montoMulta: [0, Validators.required],
      txt_codigoInforme: ['', Validators.required],
      txt_motivoMulta: ['', Validators.required],
      dt_fechaMulta: ['', Validators.required],
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

  openFormModal() {
    const modalRef = this.modalService.open(FormInformeMultaComponent);
    modalRef.componentInstance.txt_codigoInforme = null; // should be the id

    modalRef.result.then((result) => {
      this.txt_codigoInforme = result;
      this.formGroup.get('txt_codigoInforme').setValue(this.txt_codigoInforme);
      this.renderer.addClass(this.informeMulta.nativeElement, "disabled");
      console.log(this.txt_codigoInforme);
    }).catch((error) => {
      console.log(error);
    });
  }

  private submitForm() {
    this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}

  


