import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicio } from 'src/app/modelos/ejercicio';
import { EjercicioService } from 'src/app/servicios/ejercicio.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-crear-ejercicio',
  templateUrl: './crear-ejercicio.component.html',
  styleUrls: ['./crear-ejercicio.component.css']
})
export class CrearEjercicioComponent implements OnInit {

  ejercicio: Ejercicio=new Ejercicio();
  imagen: any=null;

  constructor(private ejercicioService: EjercicioService, private sesionService: SesionService, private router: Router) { }

  ngOnInit(): void {
    this.validarSesion();
  }

  validarSesion(){
    let clienteActivo=this.sesionService.clienteLogueado();
    let adminActivo=this.sesionService.adminLogueado();
    if(clienteActivo){
      this.navegarIndex();
    }
    if(!adminActivo){
      this.navegarIndex();
    }
  }

  nuevo(event:any){
    if (event!=null)
      event.preventDefault();
    this.ejercicio=new Ejercicio();
  }

  crear(){
    console.log(this.ejercicio);
    this.ejercicioService.crear(this.ejercicio).subscribe(
      res => {
          Swal.fire(constantes.exito, constantes.exito_crear_ejercicio, constantes.exito_swal);
          if (this.imagen!=null)
            this.crearImagen(res.id);
          this.nuevo(null);
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  cargarImagen(event: any){
    let imagenes: FileList=event.target.files;
    this.imagen=imagenes.item(0);
  }

  crearImagen(id: number){
    this.ejercicioService.crearImagen(this.imagen, id).subscribe(
      res => {

      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  navegarIndex() {
    this.router.navigate(['/index']);
  }

  cerrarSesion(event:any){
    if (event!=null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
  }

}
