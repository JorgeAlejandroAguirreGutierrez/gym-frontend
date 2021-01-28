import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from '../../modelos/cliente';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from './../../../environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-leer-cliente',
  templateUrl: './leer-cliente.component.html',
  styleUrls: ['./leer-cliente.component.css']
})
export class LeerClienteComponent implements OnInit {

  clientes: Cliente[]=[];
  clienteBuscar: Cliente=new Cliente();
  clienteActualizar: Cliente=new Cliente();

  observacionActualizar: String="";
  objetivoActualizar: String="";

  cerrarModal: string="";

  @ViewChild('modalObservaciones', { static: false }) private modalObservaciones: any;
  @ViewChild('modalObjetivos', { static: false }) private modalObjetivos: any;
  @ViewChild('modalClienteActualizar', { static: false }) private modalClienteActualizar: any;

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
    this.open(this.modalObservaciones);
  }

  eliminarObservacion(i: number){
    this.clienteActualizar.observaciones.splice(i, 1);
  }

  verObjetivos(i: number){
    this.clienteActualizar=this.clientes[i];
    this.open(this.modalObjetivos);
  }

  eliminarObjetivo(i: number){
    this.clienteActualizar.objetivos.splice(i, 1);
  }

  verPlanEntrenamiento(i:number){
  }

  editar(i: number){
    this.clienteActualizar=this.clientes[i];
    this.open(this.modalClienteActualizar);
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

  buscarNombre(){

  }

  objetivoCrear(){

  }

  observacionCrear(){
    
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
