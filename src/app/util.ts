'use strict';
import {HttpHeaders} from '@angular/common/http';

export const ruta: string='/gym';
export const cliente: string='/cliente';
export const sesion: string='/sesion';
export const buscar: string='/buscar';

export const headers= new HttpHeaders({'Content-Type':'application/json'});
export const options = {headers: headers};