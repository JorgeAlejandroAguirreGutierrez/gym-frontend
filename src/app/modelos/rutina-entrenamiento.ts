import { Ejercicio } from "./ejercicio";

export class RutinaEntrenamiento {
    id: number;
    numero: number;
    repeticiones: number;
    veces: number;
    pesaje: string;
    ejercicio: Ejercicio;

    constructor(){
        this.id=0;
        this.numero=0;
        this.repeticiones=0;
        this.veces=0;
        this.pesaje="";
        this.ejercicio=new Ejercicio();
    }
}