import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SideNavService } from './sidenav.service';
import { Seccion } from '../../model.component';
import { Event, Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css']
})

export class SideNavComponent{

  @ViewChild("ulContrato", { static: false }) ulContrato: ElementRef;
  isDisabled: boolean = true;
  secciones: Seccion;
  seccionactual: Seccion = null;

  constructor(private sidenavService: SideNavService, private renderer: Renderer2, private router: Router) {
    
  }

  ngAfterViewInit() {
    console.log(this.ulContrato);
    if (!this.sidenavService.getIsDisabled()) {
      this.renderer.addClass(this.ulContrato.nativeElement, "disabled");
    } else {
      this.renderer.removeClass(this.ulContrato.nativeElement, "disabled");
    }
  }
}



