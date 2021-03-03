import { RutinaEntrenamiento } from "./rutina-entrenamiento";

export class PlanEntrenamiento {
    id: number;
    numero: number;
    dia:string;
    rutinasEntrenamiento: RutinaEntrenamiento[];
    show: string="";

    constructor(){
        this.id=0;
        this.numero=0;
        this.dia="";
        this.rutinasEntrenamiento=[];
        this.show="show";
    }
}