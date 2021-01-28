import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/modelos/cliente';
import { Objetivo } from 'src/app/modelos/objetivo';
import { Observacion } from 'src/app/modelos/observacion';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  cliente: Cliente=new Cliente();
  observacion: string=""
  objetivo: string="";

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
  }

  crearObservacion(){
    let observacion: Observacion=new Observacion();
    observacion.descripcion=this.observacion;
    this.cliente.observaciones.push(observacion);
    this.observacion="";
  }

  crearObjetivo(){
    let objetivo: Objetivo=new Objetivo();
    objetivo.descripcion=this.objetivo;
    this.cliente.objetivos.push(objetivo);
    this.objetivo="";
  }

  nuevo(event:any){
    if (event!=null)
      event.preventDefault();
  }

  crear(){
    console.log(this.cliente);
    this.clienteService.crear(this.cliente).subscribe(
      res => {
        if (res!=null){
          Swal.fire(constantes.exito, constantes.exito_crear_cliente, constantes.exito_swal);
          this.navegarExitoso();
        }
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  eliminarObservacion(i: number){
    this.cliente.observaciones.splice(i, 1);
  }

  eliminarObjetivo(i: number){
    this.cliente.objetivos.splice(i, 1);
  }

  navegarExitoso() {
    this.router.navigate(['/crear-cliente']);
  }

}
