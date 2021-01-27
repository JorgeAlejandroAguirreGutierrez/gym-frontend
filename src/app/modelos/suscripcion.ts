export class Suscripcion {
    id: number;
    activa: boolean;
    fecha: Date;

    constructor(){
        this.id=0;
        this.activa=false;
        this.fecha=new Date();
    }
}