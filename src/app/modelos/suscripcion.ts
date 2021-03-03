export class Suscripcion {
    id: number;
    valor: number;
    fecha: Date;

    constructor(){
        this.id=0;
        this.valor=0;
        this.fecha=new Date();
    }
}