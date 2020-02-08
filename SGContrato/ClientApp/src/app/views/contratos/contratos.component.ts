import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Event, Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';


import { Contrato } from '../../model.component';
import { ContratosService } from './contratos.service';
import { debounceTime } from 'rxjs/operators';
import { SideNavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  contratos: Contrato[];

  contratoId: string;
  valor_filtro = '';
  showLoadingIndicator = true;

  @Output() contratoActivo = new EventEmitter<string>();

  constructor(private contratosService: ContratosService, private router: Router, private sidenavService: SideNavService) {
    this.router.events.subscribe((routerEvent: Event) => {

      if (RouterEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (RouterEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }      
    });
  }

  ngOnInit() {
    this.sidenavService.setIsDisabled(false);
    this.filtro.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrarContrato(value));
    this.contratosService.setContratoId('0');
    this.contratosService.getContratos().subscribe(contratosDesdeWS => this.contratos = contratosDesdeWS, error => console.error(error), () => this.cargarDatos());
  }

  cargarDatos() {
    console.log(this.contratos);
  }

  mostrarDetalle(contratoId: string) {
    this.sidenavService.setIsDisabled(true);
    this.contratosService.setContratoId(contratoId);
    this.router.navigate(["/DatosGenerales"]);
  }

  filtro = new FormControl('')

  //@Output('filtro') filtroEmitter = new EventEmitter<string>();

  filtrarContrato(value: string) {
    this.valor_filtro = value
  }

}



/////////////////////////*************************************************************************
