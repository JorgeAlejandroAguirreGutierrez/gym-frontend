import { Injectable } from '@angular/core';
import { Cliente } from '../modelos/cliente';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(cliente: Cliente): Observable<Cliente> {
    return this.http.post(environment.host + util.ruta + util.cliente, cliente, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.host + util.ruta + util.cliente, util.options).pipe(
      map(response => response as Cliente[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
  async consultarAsync(): Promise<Cliente[]> {
    return await this.http.get<Cliente[]>(environment.host + util.ruta + util.cliente, util.options).pipe(
      map(response => response as Cliente[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(cliente_id: number): Observable<Cliente> {
    return this.http.get<Cliente>(environment.host + util.ruta + util.cliente + '/' + cliente_id, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(cliente_id: number): Promise<Cliente> {
    return await this.http.get<Cliente>(environment.host + util.ruta + util.cliente + '/' + cliente_id, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(cliente: Cliente): Observable<Cliente> {
    return this.http.put(environment.host+util.ruta+util.cliente, cliente, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(cliente_id: number): Observable<Cliente> {
    return this.http.delete(environment.host+util.ruta+util.cliente + '/' + cliente_id, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(cliente: Cliente): Observable<Cliente[]> {
    return this.http.put(environment.host+util.ruta+util.cliente+util.buscar, cliente, util.options).pipe(
      map(response => response as Cliente[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}