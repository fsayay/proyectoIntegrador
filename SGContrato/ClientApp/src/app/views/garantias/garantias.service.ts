import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Garantia, Tipo, Contrato, Seccion } from '../../model.component';

@Injectable({
  providedIn: 'root'
})

export class GarantiasService {

  private apiURL = this.baseUrl + "api/Garantia";
  private apiURLTipo = this.baseUrl + "api/Tipo";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
   
  }

  // Metodo get para traer las garantias por contratoId
  public getGarantias(contratoId: string): Observable<Contrato> {
    return this.http.get<Contrato>(this.apiURL + '/' + contratoId);
  }

  // Metodo get para traer tipos de garantias por seccionId
  public getTipoGarantia(seccionId): Observable<Seccion> {
    return this.http.get<Seccion>(this.apiURLTipo + '/' + seccionId);
  }

  // Metodo post para insertar nueva garantia
  public postGarantia(garantia: Garantia): Observable<Garantia>{
    return this.http.post<Garantia>(this.apiURL, garantia);
  }


}




