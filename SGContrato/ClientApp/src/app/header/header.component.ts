import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model.component';
import { SideNavService } from '../views/sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent
{
   

  isExpanded = false;
  
  public user: User;
  public isLoggedIn: boolean = true;

  constructor(private router: Router, private sidenavService: SideNavService) { }

  
 collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


  ngOnInit(){
    
  }

  login() {
    this.userAuthenticated();
    //window.location.href = "http://localhost:5001/api/Login/login";
    //this.authService.authenticateUser().subscribe(user => this.user = user, error => console.error(error), () => this.userAuthenticated());
  }

  public userAuthenticated() {
    console.log(this.user);
    this.isLoggedIn = true;
    this.router.navigate(['/contratos']);
  }

  logOut() {
    this.isLoggedIn = false;
    this.sidenavService.setIsDisabled(false);
    //this.authService.exitUser();
    this.router.navigate(['/']);
  }





}


