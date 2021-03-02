import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { Objetivo } from 'src/app/modelos/objetivo';
import { Observacion } from 'src/app/modelos/observacion';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { Peso } from 'src/app/modelos/peso';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  usuario: Usuario = new Usuario();
  observacion: string = ""
  objetivo: string = "";
  peso: number = 0;

  constructor(private usuarioService: UsuarioService, private sesionService: SesionService, private router: Router) { }

  ngOnInit(): void {
    this.validarSesion();
  }

  validarSesion() {
    let clienteActivo = this.sesionService.clienteLogueado();
    let adminActivo = this.sesionService.adminLogueado();
    if (clienteActivo) {
      this.navegarIndex();
    }
    if (!adminActivo) {
      this.navegarIndex();
    }
  }

  crearPeso() {
    let peso: Peso = new Peso();
    peso.valor = this.peso;
    this.usuario.pesos.push(peso);
    this.peso = 0;
  }

  crearObservacion() {
    let observacion: Observacion = new Observacion();
    observacion.descripcion = this.observacion;
    this.usuario.observaciones.push(observacion);
    this.observacion = "";
  }

  crearObjetivo() {
    let objetivo: Objetivo = new Objetivo();
    objetivo.descripcion = this.objetivo;
    this.usuario.objetivos.push(objetivo);
    this.objetivo = "";
  }

  nuevo(event: any) {
    if (event != null)
      event.preventDefault();
  }

  crear() {
    console.log(this.usuario);
    this.usuarioService.crearCliente(this.usuario).subscribe(
      res => {
        Swal.fire(constantes.exito, constantes.exito_crear_usuario, constantes.exito_swal);
        this.navegarExitoso();
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_usuario, constantes.error_swal)
      }
    );
  }

  eliminarPeso(i: number) {
    this.usuario.pesos.splice(i, 1);
  }

  eliminarObservacion(i: number) {
    this.usuario.observaciones.splice(i, 1);
  }

  eliminarObjetivo(i: number) {
    this.usuario.objetivos.splice(i, 1);
  }

  navegarExitoso() {
    this.router.navigate(['/crear-cliente']);
  }

  navegarIndex() {
    this.router.navigate(['/index']);
  }

  cerrarSesion(event: any) {
    if (event != null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
    this.navegarIndex();
  }

}
