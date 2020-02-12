import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthUser, AuthUserInterface } from '../model.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  _user: AuthUser;
  _isLoggedIn = false;

  constructor(private _cookieService: CookieService, private _http: HttpClient) { }

  isLoggedIn(): boolean {
    // if (this._cookieService.check(environment.cookieName)) {
    //   //let str:string = this._cookieService.get(environment.cookieName);
    //   this._isLoggedIn = true;
    // }
    return this._isLoggedIn;
  }

  login(redirectUrl: string): void {
    // window.location.href = environment.appUrl + '/api/login?returnUrl=' + environment.appUrl + redirectUrl;
  }

  logout(): void {
    this._isLoggedIn = false;
    this._user = null;
  }

  getUser(): Observable<AuthUser> {
    if (this._isLoggedIn && this._user) { return of(this._user); }
    return this._http.get<AuthUserInterface>('/api/getUser');
  }
}
