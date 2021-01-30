import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from '../../modelos/cliente';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from './../../../environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { Observacion } from 'src/app/modelos/observacion';
import { Objetivo } from 'src/app/modelos/objetivo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leer-cliente',
  templateUrl: './leer-cliente.component.html',
  styleUrls: ['./leer-cliente.component.css']
})
export class LeerClienteComponent implements OnInit {

  clientes: Cliente[]=[];
  clienteBuscar: Cliente=new Cliente();
  clienteActualizar: Cliente=new Cliente();

  observacionActualizar: string="";
  objetivoActualizar: string="";

  cerrarModal: string="";

  @ViewChild('modalObservaciones', { static: false }) private modalObservaciones: any;
  @ViewChild('modalObjetivos', { static: false }) private modalObjetivos: any;
  @ViewChild('modalClienteActualizar', { static: false }) private modalClienteActualizar: any;

  constructor(private clienteService: ClienteService, private router: Router, private modalService: NgbModal) { }

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

  observacionesVer(i: number){
    this.clienteActualizar=this.clientes[i];
    this.open(this.modalObservaciones);
  }

  observacionEliminar(i: number){
    this.clienteActualizar.observaciones.splice(i, 1);
  }

  objetivosVer(i: number){
    this.clienteActualizar=this.clientes[i];
    this.open(this.modalObjetivos);
  }

  planEntrenamientoVer(i:number){
  }

  objetivoEliminar(i: number){
    this.clienteActualizar.objetivos.splice(i, 1);
  }

  planEntrenamientoEliminar(i:number){
  }

  editar(i: number){
    this.clienteActualizar=this.clientes[i];
    this.open(this.modalClienteActualizar);
  }

  actualizar(){
    console.log(this.clienteActualizar);
    this.clienteService.actualizar(this.clienteActualizar).subscribe(
      res => {
        this.modalService.dismissAll();
        Swal.fire(constantes.exito, constantes.exito_actualizar_cliente, constantes.exito_swal)
        this.navegarClienteActualizar();
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  buscar(){
    console.log(this.clienteBuscar);
    this.clienteService.buscar(this.clienteBuscar).subscribe(
      res => {
        this.clientes=res;
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  observacionCrear(){
    let observacion: Observacion=new Observacion();
    observacion.descripcion=this.observacionActualizar;
    this.clienteActualizar.observaciones.push(observacion);
    this.observacionActualizar="";
  }

  objetivoCrear(){
    let objetivo: Objetivo=new Objetivo();
    objetivo.descripcion=this.objetivoActualizar;
    this.clienteActualizar.objetivos.push(objetivo);
    this.objetivoActualizar="";
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

  navegarClienteActualizar() {
    this.router.navigate(['/leer-cliente']);
  }

}
