import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  observaciones: string[]=[];
  objetivos: string[]=[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  clienteForm = new FormGroup({
    nombre: new FormControl(''),
    talla: new FormControl(''),
    peso: new FormControl(''),
    edad: new FormControl(''),
    observacion: new FormControl(''),
    objetivo: new FormControl(''),
  });

  crearObservacion(){
    let observacion=this.clienteForm.get('observacion')?.value;
    console.log(observacion);
    this.observaciones.push(observacion);
  }

  crearObjetivo(){
    let objetivo=this.clienteForm.get('objetivo')?.value;
    console.log(objetivo);
    this.objetivos.push(objetivo);
  }

  nuevo(event:any){
    if (event!=null)
      event.preventDefault();
  }

  crear(event:any){
    if (event!=null)
      event.preventDefault();
    this.cliente.nombre=this.clienteForm.get('nombre')?.value;
    this.cliente.talla=this.clienteForm.get('talla')?.value;
    this.cliente.peso=this.clienteForm.get('peso')?.value;
    this.cliente.edad=this.clienteForm.get('edad')?.value;
    for(let i=0; i<this.observaciones.length; i++){
      let observacion= new Observacion();
      observacion.descripcion=this.observaciones[i];
    }
    for(let i=0; i<this.objetivos.length; i++){
      let objetivos= new Objetivo();
      objetivos.descripcion=this.objetivos[i];
    }
    console.log(this.cliente);
    this.clienteService.crear(this.cliente).subscribe(
      res => {
        if (res!=null){
          Swal.fire(constantes.exito, constantes.exito_crear_producto, constantes.exito_swal);
        }
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  eliminarObservacion(i: number){
    this.observaciones.splice(i, 1);
  }

  eliminarObjetivo(i: number){
    this.objetivos.splice(i, 1);
  }

}
