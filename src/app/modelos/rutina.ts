import { Ejercicio } from "./ejercicio";

export class Rutina {
    id: number;
    repeticiones: number;
    veces: number;
    valorPeso: number;
    medidaPeso: string;
    valorTiempo: number;
    medidaTiempo: string;
    ejercicio: Ejercicio;

    constructor(){
        this.id=0;
        this.repeticiones=0;
        this.veces=0;
        this.valorPeso=0;
        this.medidaPeso="";
        this.valorTiempo=0;
        this.medidaTiempo="";
        this.ejercicio=new Ejercicio();
    }
}