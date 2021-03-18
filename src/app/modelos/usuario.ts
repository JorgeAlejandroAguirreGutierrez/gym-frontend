import { Objetivo } from "./objetivo";
import { Observacion } from "./observacion";
import { Perfil } from "./perfil";
import { Peso } from "./peso";
import { PlanEntrenamiento } from "./plan-entrenamiento";
import { Suscripcion } from "./suscripcion";

export class Usuario {
    id: number;
    nombre: string;
    identificacion: string;
    contrasena: string; 
    talla: number;
    edad: number;
    imagen: string;
    perfil: Perfil;
    pesos: Peso[];
    suscripciones: Suscripcion[];
    objetivos: Objetivo[];
    observaciones: Observacion[];
    planesEntrenamiento: PlanEntrenamiento[];

    constructor(){
        this.id=0;
        this.nombre="";
        this.identificacion="";
        this.contrasena="";
        this.talla=0;
        this.edad=0;
        this.imagen="";
        this.perfil=new Perfil();
        this.pesos=[];
        this.suscripciones=[];
        this.objetivos=[];
        this.observaciones=[];
        this.planesEntrenamiento=[];
    }
}