import { TipoMusculo } from "./tipo-musculo";

export class Ejercicio {
    id: number;
    descripcion: string;
    imagen: string="";
    tipoMusculo: TipoMusculo;

    constructor(){
        this.id=0;
        this.descripcion="";
        this.imagen="";
        this.tipoMusculo=new TipoMusculo();
    }
}