import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from '../../modelos/cliente';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from './../../../environments/environment';
import { Observacion } from 'src/app/modelos/observacion';
import { Objetivo } from 'src/app/modelos/objetivo';
import { DiaEntrenamiento } from 'src/app/modelos/dia-entrenamiento';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leer-cliente',
  templateUrl: './leer-cliente.component.html',
  styleUrls: ['./leer-cliente.component.css']
})
export class LeerClienteComponent implements OnInit {

  clientes: Cliente[]=[];
  clienteActualizar: Cliente=new Cliente();

  cerrarModal: string="";

  constructor(private clienteService: ClienteService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.clienteService.consultar().subscribe(
      res => {
        this.clientes = res;
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  verObservaciones(i: number){
    this.clienteActualizar=this.clientes[i];
  }

  eliminarObservacion(i: number){

  }

  verObjetivos(i: number){
    this.clienteActualizar=this.clientes[i];
  }

  eliminarObjetivo(i: number){
  }

  verPlanEntrenamiento(i:number){
  }

  editar(i: number){
    this.clienteActualizar=this.clientes[i];
  }

  actualizar(){
    this.clienteService.actualizar(this.clienteActualizar).subscribe(
      res => {
        this.clienteActualizar = res;
        Swal.fire(constantes.exito, constantes.exito_actualizar_cliente, constantes.exito_swal)
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.cerrarModal = `Closed with: ${result}`;
    }, (reason) => {
      this.cerrarModal = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
