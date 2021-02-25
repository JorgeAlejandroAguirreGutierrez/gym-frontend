'use strict';
import {HttpHeaders} from '@angular/common/http';

export const ruta: string='/gym';
export const usuario: string='/usuario';
export const sesion: string='/sesion';
export const ejercicio: string='/ejercicio';
export const parametro: string='/parametro';
export const buscar: string='/buscar';
export const consultarPorTipo: string='/consultarPorTipo';
export const consultarPorTituloTipo: string='/consultarPorTituloTipo';
export const consultarClientes: string='/consultarClientes';
export const consultarAdmins: string='/consultarAdmins';

export const headers= new HttpHeaders({'Content-Type':'application/json'});
export const options = {headers: headers};
export const headersImagen= new HttpHeaders({});
export const optionsImagen = {headers: headersImagen};