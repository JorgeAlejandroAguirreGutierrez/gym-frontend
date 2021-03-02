import { RutinaEntrenamiento } from "./rutina-entrenamiento";

export class PlanEntrenamiento {
    id: number;
    numero: number;
    rutinasEntrenamiento: RutinaEntrenamiento[];
    show: string="";

    constructor(){
        this.id=0;
        this.numero=0;
        this.rutinasEntrenamiento=[];
        this.show="show";
    }
}