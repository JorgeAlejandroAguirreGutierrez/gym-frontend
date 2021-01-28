import { DiaEntrenamiento } from "./dia-entrenamiento";
import { Objetivo } from "./objetivo";
import { Observacion } from "./observacion";
import { Suscripcion } from "./suscripcion";

export class Cliente {
    id: number;
    nombre: string;
    identificacion: string;
    contrasena: string; 
    talla: string;
    peso: string;
    edad: string;
    imagen: string;
    suscripciones: Suscripcion[];
    objetivos: Objetivo[];
    observaciones: Observacion[];
    planEntrenamiento: DiaEntrenamiento[];

    constructor(){
        this.id=0;
        this.nombre="";
        this.identificacion="";
        this.contrasena="";
        this.talla="";
        this.peso="";
        this.edad="";
        this.imagen="";
        this.suscripciones=[];
        this.objetivos=[];
        this.observaciones=[];
        this.planEntrenamiento=[];
    }
}