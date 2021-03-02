import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Ejercicio } from '../modelos/ejercicio';
import { RutinaEntrenamiento } from '../modelos/rutina-entrenamiento';

@Injectable({
  providedIn: 'root'
})
export class RutinaEntrenamientoService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(rutinaEntrenamiento: RutinaEntrenamiento): Observable<RutinaEntrenamiento> {
    return this.http.post(environment.host + util.ruta + util.rutinaentrenamiento, rutinaEntrenamiento, util.options).pipe(
      map(response => response as RutinaEntrenamiento),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<RutinaEntrenamiento[]> {
    return this.http.get<RutinaEntrenamiento[]>(environment.host + util.ruta + util.rutinaentrenamiento, util.options).pipe(
      map(response => response as RutinaEntrenamiento[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
  async consultarAsync(): Promise<RutinaEntrenamiento[]> {
    return await this.http.get<RutinaEntrenamiento[]>(environment.host + util.ruta + util.rutinaentrenamiento, util.options).pipe(
      map(response => response as RutinaEntrenamiento[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(id: number): Observable<RutinaEntrenamiento> {
    return this.http.get<RutinaEntrenamiento>(environment.host + util.ruta + util.rutinaentrenamiento + '/' + id, util.options).pipe(
      map(response => response as RutinaEntrenamiento),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(id: number): Promise<Ejercicio> {
    return await this.http.get<Ejercicio>(environment.host + util.ruta + util.rutinaentrenamiento + '/' + id, util.options).pipe(
      map(response => response as Ejercicio),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(rutinaEntrenamiento: RutinaEntrenamiento): Observable<RutinaEntrenamiento> {
    return this.http.put(environment.host+util.ruta+util.rutinaentrenamiento, rutinaEntrenamiento, util.options).pipe(
      map(response => response as RutinaEntrenamiento),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<RutinaEntrenamiento> {
    return this.http.delete(environment.host+util.ruta+util.rutinaentrenamiento + '/' + id, util.options).pipe(
      map(response => response as RutinaEntrenamiento),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}