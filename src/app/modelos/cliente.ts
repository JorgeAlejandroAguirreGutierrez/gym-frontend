import { DiaEntrenamiento } from "./dia-entrenamiento";
import { Objetivo } from "./objetivo";
import { Observacion } from "./observacion";
import { Perfil } from "./perfil";
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
    perfil: Perfil;
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
        this.perfil=new Perfil();
        this.suscripciones=[];
        this.objetivos=[];
        this.observaciones=[];
        this.planEntrenamiento=[];
    }
}