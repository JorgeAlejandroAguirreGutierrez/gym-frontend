import { TipoMusculo } from "./tipo-musculo";

export class Ejercicio {
    id: number;
    descripcion: string;
    tipoMusculo: TipoMusculo;

    constructor(){
        this.id=0;
        this.descripcion="";
        this.tipoMusculo=new TipoMusculo();
    }
}