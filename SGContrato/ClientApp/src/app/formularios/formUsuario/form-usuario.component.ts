import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { UserRol, Rol, User } from '../../model.component';
import { CatalogoService } from '../../catalogo/catalogo.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {

  @Input() public tmpUserRol;
  @ViewChild("formUsuario", { static: false }) formUsuario: ElementRef;
  userRol: UserRol;
  formGroup: FormGroup;
  roles: Rol;
  user: User;
  selection = new SelectionModel<Rol>(true, []);

  constructor(private http: HttpClient, private modalService: NgbModal, private activeModal: NgbActiveModal, private renderer: Renderer2, private formBuilder: FormBuilder, private catalogoService: CatalogoService) {

  }

  ngOnInit() {
    this.catalogoService.getRoles().subscribe(rolesDesdeWS => this.roles = rolesDesdeWS, error => console.error(error), () => this.llenarTabla());
    if (this.tmpUserRol == null)
      this.createForm();
    else
      this.loadForm();
  }

  llenarTabla() {
    console.log(this.roles);
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormUserComponent);
    modalRef.componentInstance.user = null; // should be the id
    modalRef.result.then((result) => {
      this.user = result;
      console.log(this.user.txt_username.toString());
      this.formGroup.get('userID').setValue(this.user.ID);
      this.formGroup.get('txt_username').setValue(this.user.txt_username);
      //this.renderer.addClass(this.formUsuario.nativeElement, "disabled");
      this.renderer.setAttribute(this.formUsuario.nativeElement, 'value', this.user.txt_username);
    }).catch((error) => {
      console.log(error);
    });
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      userID: 0,
      txt_username:'',
      txt_emailAlterno: '',
      listaRoles: this.selection.selected
    });
  }

  private loadForm() {
    this.formGroup = this.formBuilder.group({
      userID: this.tmpUserRol.userID,
      rolId: this.tmpUserRol.rolID
    });
    console.log(this.formGroup.value);
  }

  private submitForm() {
    this.formGroup.get('listaRoles').setValue(this.selection.selected);
    console.log(this.formGroup.value);
    //this.activeModal.close(this.formGroup.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}


