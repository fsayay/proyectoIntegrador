import { Component } from '@angular/core';
import { FormaPago, Pago, Tipo } from '../../model.component';
import { ContratosService } from '../contratos/contratos.service';
import { PagosService } from './pagos.service';
import { Router } from '@angular/router';
import { FormFormaPagoComponent } from '../../formularios/formFormaPago/formFormaPago.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-pagos',
    templateUrl: './pagos.component.html',
    styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  public nuevosPagos: Pago[]
  public pagos: Pago[];
  public formaPago: FormaPago;
  public nuevaFormaPago: FormaPago;

  constructor(private modalService: NgbModal, private contratosService: ContratosService, private pagosService: PagosService, private router: Router) {

  }

  ngOnInit() {
    this.cargarDatos();    
  }

  public cargarDatos() {
    let formaPago;
    this.pagosService.getFormaPago(this.contratosService.getIdContratoActivo()).subscribe(formaPagoDesdeWS => formaPago = formaPagoDesdeWS, error => console.error(error), () => this.llenarTabla(formaPago));
  }

  public llenarTabla(formaPago: FormaPago) {
    this.formaPago = formaPago;
    this.pagos = this.formaPago.pagos;
  }

  openFormModal() {
    const modalRef = this.modalService.open(FormFormaPagoComponent);
    modalRef.componentInstance.pagos = null; // should be the id
    modalRef.result.then((result) => {
      console.log(result);
      this.separar(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  separar(formaPago: FormaPago) {
    let listaPago: Pago[];
    let nuevaForma: FormaPago;
    listaPago = formaPago.pagos;
    console.log(listaPago);

    nuevaForma.ID = formaPago.ID;
    nuevaForma.qn_tipoPago = formaPago.qn_tipoPago;
    nuevaForma.txt_archivoPago = formaPago.txt_archivoPago.replace(/\\/g, "/");
    nuevaForma.dt_fechaUltimoCambio = formaPago.dt_fechaUltimoCambio;
    nuevaForma.contratoID = formaPago.contratoID;
    nuevaForma.pagos = null;
    console.log(nuevaForma);


    //formaPago.txt_archivoPago = formaPago.txt_archivoPago.replace(/\\/g, "/");
    //this.nuevosPagos = formaPago.pagos;
    //formaPago.pagos = null;
    //console.log(formaPago);
    //this.pagosService.insertFormaPago(formaPago).subscribe(formaPagoDesdeWS => formaPago = formaPagoDesdeWS, error => console.error(error), () =>this.insertarPagos(formaPago));        
    }

  insertarPagos(formaPago: FormaPago) {
    console.log(formaPago);
    let pago: Pago;
    this.nuevosPagos.forEach(x => {
      console.log(x);
      x.formaPagoID = formaPago.ID;
      console.log(x);
      this.pagosService.insertPagos(x).subscribe(pagoDesdeWS => pago = pagoDesdeWS, error => console.error(error), () => this.cargarDatos());
    });
    
  }

  cargarComprobante(pagoId: string) {


  }
}

