import { Component, Input, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratosService } from '../../views/contratos/contratos.service';
import { Tipo, Seccion } from '../../model.component';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { SideNavService } from '../../views/sidenav/sidenav.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-form-garantia',
  templateUrl: './form-garantia.component.html'
})
export class FormGarantiaComponent implements OnInit {
  @Input() garantia;
  tiposGarantia: Tipo[];
  formGroup: FormGroup;
  public progress: number;
  public message: string;
  public tempFile: any;
  public garantiaImgPath: any;

  constructor(private http: HttpClient,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cs: ContratosService,
    private sidenavService: SideNavService,
    private datePipe: DatePipe,
    private domSanitizer: DomSanitizer) {
    let seccion;
    this.sidenavService
      .getSeccion('2')
      .subscribe(
        tiposDesdeWS => seccion = tiposDesdeWS,
        error => console.error(error),
        () => this.llenarTabla(seccion));
  }

  ngOnInit() {
    this.createForm();
    if (this.garantia != null) {
      const tempGarantia = _.omit(this.garantia, 'txt_archivoGarantia');
      if (this.garantia.txt_archivoGarantia) {
        this.garantiaImgPath = this.domSanitizer.bypassSecurityTrustResourceUrl(
          this.garantia.txt_archivoGarantia.replace('C:\\fakepath\\', '/Upload/')
        );
      }
      console.log(this.garantia);
      tempGarantia.ID = tempGarantia.id;
      tempGarantia.dt_inicioGarantia = this.datePipe.transform(this.garantia.dt_inicioGarantia, 'yyyy-MM-dd');
      tempGarantia.dt_finGarantia = this.datePipe.transform(this.garantia.dt_finGarantia, 'yyyy-MM-dd');
      this.formGroup.patchValue(tempGarantia);
    }
  }

  llenarTabla(seccion: Seccion) {
    this.tiposGarantia = seccion.tipos;
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      id: 0,
      qn_tipoGarantia: [0, Validators.required],
      vm_valorGarantia: [0, Validators.required],
      txt_codigoGarantia: ['', Validators.required],
      txt_proveedorGarantia: ['', Validators.required],
      dt_inicioGarantia: ['', Validators.required],
      dt_finGarantia: ['', Validators.required],
      txt_archivoGarantia: [''],
      dt_fechaUltimoCambio: today,
      contratoID: this.cs.getIdContratoActivo()
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const fileReader = new FileReader();
      const [file] = event.target.files;
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.tempFile = {
          original: file,
          result: fileReader.result
        };
        this.formGroup.get('txt_archivoGarantia').patchValue({
          txt_archivoGarantia: file
        });
      };
    }
  }

  upload(files) {
    // if (files.length === 0) {
    //   return;
    // }
    // const formData = new FormData();

    // for (const file of files) {
    //   formData.append(file.name, file);
    // }

    // const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
    //   reportProgress: true,
    // });

    // this.http.request(uploadReq).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress)
    //     this.progress = Math.round(100 * event.loaded / event.total);
    //   else if (event.type === HttpEventType.Response)
    //     this.message = event.body.toString();
    // });
  }

  private submitForm() {
    this.activeModal.close(
      {
        values: this.tempFile != null ? this.formGroup.value : _.omit(this.formGroup.value,['txt_archivoGarantia']),
        fileData: this.tempFile
      }
    );
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
