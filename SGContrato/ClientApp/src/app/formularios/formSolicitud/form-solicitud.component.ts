import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../model.component';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css']
})
export class FormSolicitudComponent implements OnInit {

  @Input() cantContratos: number;
  public formGroup: FormGroup;
  @ViewChild("formAdm", { static: false }) formAdm: ElementRef;
  @ViewChild("formDes", { static: false }) formDes: ElementRef;
  user: User;

  constructor(private http: HttpClient, private modalService: NgbModal, private activeModal: NgbActiveModal, private renderer: Renderer2, private formBuilder: FormBuilder) {

  }
  ngOnInit() {
    this.createForm();
  }

  elegirAdministrador() {
    const modalRef = this.modalService.open(FormUserComponent);
    modalRef.componentInstance.user = null; // should be the id
    modalRef.result.then((result) => {
      this.user = result;
      this.formGroup.get('txt_admRecomendado').setValue(this.user.txt_username);
      //this.renderer.addClass(this.formUsuario.nativeElement, "disabled");
      this.renderer.setAttribute(this.formAdm.nativeElement, 'value', this.user.txt_username);
    }).catch((error) => {
      console.log(error);
    });
  }

  elegirDestinatario() {
    const modalRef = this.modalService.open(FormUserComponent);
    modalRef.componentInstance.user = null; // should be the id
    modalRef.result.then((result) => {
      this.user = result;
      this.formGroup.get('txt_destinatario').setValue(this.user.txt_username);
      //this.renderer.addClass(this.formUsuario.nativeElement, "disabled");
      this.renderer.setAttribute(this.formDes.nativeElement, 'value', this.user.txt_username);
    }).catch((error) => {
      console.log(error);
    });
  }

  private createForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      qn_cantContratos: this.cantContratos,
      txt_motivoTransferencia: ['', Validators.required],
      txt_admRecomendado: ['', Validators.required],
      txt_destinatario: ['', Validators.required],
      dt_fechaSolicitud: today
    });
  }

  private submitForm() {
    this.cantContratos = 0;
    this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
