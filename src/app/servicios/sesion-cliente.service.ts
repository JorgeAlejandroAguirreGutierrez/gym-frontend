import { Injectable } from '@angular/core';
import { SesionCliente } from '../modelos/sesion-cliente';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionClienteService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(sesion: SesionCliente): Observable<SesionCliente> {
    return this.http.post(environment.host + util.ruta + util.sesion, sesion, util.options).pipe(
      map(response => response as SesionCliente),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  setSesion(sesion: SesionCliente) {
    sessionStorage.setItem('sesion', JSON.stringify(sesion));

  }

  getSesion(): SesionCliente {
    return JSON.parse(sessionStorage.getItem('sesion') || null as any);
  }

  clienteLogueado(){
    let sesion=JSON.parse(sessionStorage.getItem('sesion') || null as any);
    return sesion!=null;
  }

  cerrarSesion(){
    sessionStorage.removeItem('sesion');
  }
}