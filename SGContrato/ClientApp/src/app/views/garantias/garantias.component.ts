import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { GarantiasService } from '../garantias/garantias.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContratosService } from '../contratos/contratos.service';
import { Contrato, Garantia } from '../../model.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGarantiaComponent } from '../../formularios/formGarantia/form-garantia.component';
import { ShowPdfComponent } from '../showPdfComponent/show-pdf.component';

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
  public progress: number;
  public message: string;

  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal, private http: HttpClient,
    private contratosService: ContratosService,
    private garantiasService: GarantiasService,
    private fb: FormBuilder,
    private router: Router) {

  }

  ngOnInit() {
    this.garantiasService.getGarantias(this.contratosService.getIdContratoActivo())
      .subscribe(
        contratoConGarantiasDesdeWS => {
          this.contrato = contratoConGarantiasDesdeWS;
          this.cargarDatos();
        },
        error => console.error(error),
        () => { }
      );
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
      console.log(result);
      this.editGarantia = result.values;
      this.editar();
      if(result.fileData!=null){
        this.upload(result.fileData);
      }
      
    }).catch((error) => {
      console.log(error);
    });
  }

  public editar() {
    this.contrato.garantias.forEach((x, index, arr) => {
      if (x.id === this.editGarantia.id) {
        x = this.editGarantia;
        arr[index] = this.editGarantia;
        console.log(x);
      }
    });
    this.guardar();
  }


  public insertar() {
    this.nuevaGarantia.txt_archivoGarantia = this.nuevaGarantia.txt_archivoGarantia.replace(/\\/g, "/");
    this.contrato.garantias.push(this.nuevaGarantia);
    this.guardar();
  }

  public guardar() {
    this.contratosService.updateContrato(this.contrato)
      .subscribe(
        contratoDesdeWS => this.contrato = contratoDesdeWS,
        error => console.error(error),
        () => this.cargarDatos()
      );
  }

  upload(file) {
    console.log(file);
    const formData = new FormData();
    try {
      formData.append(file.original.name, file.original);
      const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
        reportProgress: true,
      });

      this.http.request(uploadReq).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = event.body.toString();
        }
      });
    } catch (err) {
      console.log(err);
    }

  }

  verPdf(url: any) {
    const modalRef = this.modalService.open(ShowPdfComponent);
    modalRef.componentInstance.filePath = url;
  }
}

