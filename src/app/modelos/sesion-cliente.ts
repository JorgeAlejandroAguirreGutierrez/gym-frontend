import { Cliente } from "./cliente";

export class SesionCliente {
    id: number;
    estado:boolean;
    fechaApertura: Date;
    fechaCierre: Date;
    cliente: Cliente;

    constructor() { 
        this.id=0;
        this.estado=true;
        this.fechaApertura=new Date();
        this.fechaCierre=null as any;
        this.cliente=new Cliente();  
    }
}