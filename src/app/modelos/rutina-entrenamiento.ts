import { Ejercicio } from "./ejercicio";

export class RutinaEntrenamiento {
    id: number;
    repeticiones: number;
    veces: number;
    valorPeso: string;
    medidaPeso: string;
    ejercicio: Ejercicio;

    constructor(){
        this.id=0;
        this.repeticiones=0;
        this.veces=0;
        this.valorPeso="";
        this.medidaPeso="";
        this.ejercicio=new Ejercicio();
    }
}