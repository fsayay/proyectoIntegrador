import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Tipo, Contrato, Seccion, User } from '../../model.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { ContratosService } from '../contratos/contratos.service';
import { Router } from '@angular/router';
import { SideNavService } from '../sidenav/sidenav.service';
import { FormUserComponent } from '../../formularios/form-user/form-user.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nuevo-contrato',
  templateUrl: './nuevo-contrato.component.html',
  styleUrls: ['./nuevo-contrato.component.css']
})
export class NuevoContratoComponent implements OnInit {
     
  @Input() tipoId: number;
  tiposContrato: Tipo[];
  tiposProceso: Tipo[];
  estadoContrato: Tipo[];
  public progress: number;
  public message: string;
  formGroup: FormGroup;
  public contrato: Contrato;

  @ViewChild("descripcion", { static: false }) descripcion: ElementRef;
  @ViewChild("email", { static: false }) email: ElementRef;
  @ViewChild("ruc", { static: false }) ruc: ElementRef;
  @ViewChild("formDes", { static: false }) formDes: ElementRef;

  public proveedores;
  public unidades;
  user: User;



  constructor(private modalService: NgbModal, private renderer: Renderer2, private sidenavService: SideNavService, private http: HttpClient, private formBuilder: FormBuilder, public contratosService: ContratosService, public router: Router) {
    this.unidades =
      [
        {
          ID: "1",
          nombre: "FIEC",
          descripcion: "Unidad especializada en la compra de equipos tecnologicos",
          email: "fiec@espol.edu.ec"
        },
        {
          ID: "2",
          nombre: "FICT",
          descripcion: "Unidad especializada en la compra de equipos para excavacion",
          email: "fict@espol.edu.ec"
        }
      ];
    this.proveedores =
      [
        {
          ID: 1,
          name: "Kyrios Technologies",
          ruc: 2978798798001
        },
        {
          ID: 2,
          name: "TodoTek",
          ruc: 6865645622967
        },
        {
          ID: 3,
          name: "Inacorpsa",
          ruc: 9676865645622
        },
      {
        ID: 4,
        name: "ProIcons",
        ruc: 4562296768656
      },
      {
        ID: 5,
        name: "Snapsha",
        ruc: 5866456229676
      },
      ];

    this.crearFormulario();
    let seccion
    this.sidenavService.getSeccion('1').subscribe(tiposDesdeWS => seccion = tiposDesdeWS, error => console.error(error), () => this.llenarTabla1(seccion));

  }

  llenarTabla1(seccion: Seccion) {
    console.log(seccion);
    this.tiposContrato = seccion.tipos;
    let seccion2;
    this.sidenavService.getSeccion('3').subscribe(tiposDesdeWS => seccion2 = tiposDesdeWS, error => console.error(error), () => this.llenarTabla2(seccion2));    
  }
  llenarTabla2(seccion: Seccion) {
    console.log(seccion);
    this.tiposProceso = seccion.tipos;
    let estadoContrato;
    this.sidenavService.getSeccion('23').subscribe(tiposDesdeWS => estadoContrato = tiposDesdeWS, error => console.error(error), () => this.llenarTabla3(estadoContrato));    
    
  }

  llenarTabla3(estadoContrato: Seccion) {
    this.estadoContrato = estadoContrato.tipos;;    
  }

  ngOnInit() {
    
    
  }

  setUnidad(unidad) {
    this.renderer.setAttribute(this.descripcion.nativeElement, 'value', unidad.descripcion);
    this.renderer.setAttribute(this.email.nativeElement, 'value', unidad.email);
  }

  elegirProveedor(selectedValue: string) {
    this.renderer.setAttribute(this.ruc.nativeElement, 'value', this.proveedores[selectedValue].ruc);
  }

  elegirUnidad(selectedValue: string) {
    this.renderer.setAttribute(this.descripcion.nativeElement, 'value', this.unidades[selectedValue].descripcion);
    this.renderer.setAttribute(this.email.nativeElement, 'value', this.unidades[selectedValue].email);
  }
    
  
   private crearFormulario() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.formGroup = this.formBuilder.group({
      ID: 0,
      txt_codigoContrato: ['', Validators.required],
      qn_tipoContrato: [null, Validators.required],
      txt_numProceso: ['', Validators.required],
      qn_tipoProceso: [null, Validators.required],
      qn_vigenciaContrato: [null, Validators.required],
      dt_fechaSuscripcion: ['', Validators.required],
      dt_fechaInicio: ['', Validators.required],
      dt_fechaFin: ['', Validators.required],
      vm_montoAdjudicado: ['', Validators.required],
      bol_recurrencia: false,
      qn_proveedor: [null, Validators.required],
      txt_objetoContratacion: ['', Validators.required],
      qn_unidadConsolidadora: ['', Validators.required],
      txt_nombreDelegado: ['', Validators.required],
      txt_nombreAdministrador: ['', Validators.required],
      txt_nombreTecnicoExterno: ['', Validators.required],
      txt_detalleFormaPago: ['', Validators.required],
      txt_detalleGarantias: ['', Validators.required],
      txt_archivoContrato: ['', Validators.required],
      qn_estadoContrato: 61,
      qn_estadoTransferencia: null,
      txt_codigoTransferencia: null,
      dt_fechaUltimoCambio: today
    });
  }

  elegirAdministrador() {
    const modalRef = this.modalService.open(FormUserComponent);
    modalRef.componentInstance.user = null; // should be the id
    modalRef.result.then((result) => {
      this.user = result;
      this.formGroup.get('txt_nombreAdministrador').setValue(this.user.txt_username);
      //this.renderer.addClass(this.formUsuario.nativeElement, "disabled");
      this.renderer.setAttribute(this.formDes.nativeElement, 'value', this.user.txt_username);
    }).catch((error) => {
      console.log(error);
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
  
  onSubmit() {
    console.log(this.formGroup.value);

    let path = this.formGroup.get("txt_archivoContrato").value.replace(/\\/g, "/");
    this.formGroup.get('txt_archivoContrato').setValue(path);
    this.formGroup.get('qn_estadoContrato').setValue("1");
    console.log(this.formGroup.value);
    let contrato: Contrato = Object.assign({}, this.formGroup.value);
    this.registrar(contrato);   
  }

  registrar(contrato: Contrato) {
    this.contratosService.createContrato(contrato).subscribe(contratoDesdeWS => contrato = contratoDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  cargarDatos() {
    alert("Contrato ingresado exitosamente");
    this.formGroup.reset();
    this.router.navigate(['/contratos']);
  }

}





