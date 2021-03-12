import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from '../../modelos/usuario';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from './../../../environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { Observacion } from 'src/app/modelos/observacion';
import { Objetivo } from 'src/app/modelos/objetivo';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Peso } from 'src/app/modelos/peso';
import { Suscripcion } from 'src/app/modelos/suscripcion';

@Component({
  selector: 'app-leer-cliente',
  templateUrl: './leer-cliente.component.html',
  styleUrls: ['./leer-cliente.component.css']
})
export class LeerClienteComponent implements OnInit {

  usuarios: Usuario[]=[];
  usuarioActualizar: Usuario=new Usuario();

  nombre: string="";
  identificacion: string="";

  pesoActualizar: number=0;
  observacionActualizar: string="";
  objetivoActualizar: string="";

  suscripcionCrear: Suscripcion=new Suscripcion();

  usuariosEnc: any[] = [];

  cerrarModal: string="";

  @ViewChild('modalPesos', { static: false }) private modalPesos: any;
  @ViewChild('modalObservaciones', { static: false }) private modalObservaciones: any;
  @ViewChild('modalObjetivos', { static: false }) private modalObjetivos: any;
  @ViewChild('modalUsuarioActualizar', { static: false }) private modalUsuarioActualizar: any;
  @ViewChild('modalActualizarSuscripciones', { static: false }) private modalActualizarSuscripciones: any;

  constructor(private usuarioService: UsuarioService, private sesionService: SesionService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.validarSesion();
    this.consultarClientes();
  }

  consultarClientes(){
    this.usuarioService.consultarClientes().subscribe(
      res => {
        this.usuarios = res;
        let usuariosRec: Usuario[] = [];
        for (let i = 0; i < this.usuarios.length; i++) {
          usuariosRec.push(this.usuarios[i]);
          if (usuariosRec.length == 4) {
            this.usuariosEnc.push(usuariosRec);
            usuariosRec = [];
          }
        }
        if (usuariosRec.length > 0) {
          this.usuariosEnc.push(usuariosRec);
        }
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
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

  pesosVer(i: number){
    this.usuarioActualizar=this.usuarios[i];
    this.open(this.modalPesos);
  }

  observacionesVer(i: number){
    this.usuarioActualizar=this.usuarios[i];
    this.open(this.modalObservaciones);
  }

  pesoEliminar(i: number){
    this.usuarioActualizar.pesos.splice(i, 1);
  }
  
  observacionEliminar(i: number){
    this.usuarioActualizar.observaciones.splice(i, 1);
  }

  objetivosVer(i: number){
    this.usuarioActualizar=this.usuarios[i];
    this.open(this.modalObjetivos);
  }

  planEntrenamientoVer(i:number){
  }

  objetivoEliminar(i: number){
    this.usuarioActualizar.objetivos.splice(i, 1);
  }

  suscripcionEliminar(i: number){
    this.usuarioActualizar.suscripciones.splice(i, 1);
  }

  planEntrenamientoEliminar(i:number){
  }

  editar(i: number){
    this.usuarioActualizar= {... this.usuarios[i]};
    this.open(this.modalUsuarioActualizar);
  }

  actualizarSuscripciones(i: number){
    this.usuarioActualizar= {... this.usuarios[i]};
    this.open(this.modalActualizarSuscripciones);
  }

  actualizar(){
    console.log(this.usuarioActualizar);
    this.usuarioService.actualizar(this.usuarioActualizar).subscribe(
      res => {
        this.modalService.dismissAll();
        Swal.fire(constantes.exito, constantes.exito_actualizar_usuario, constantes.exito_swal)
        this.navegarExitoso();
      },
      err => {
        Swal.fire(constantes.error, constantes.error_actualizar_usuario, constantes.error_swal)
      }
    );
  }

  limpiarNombre(){
    this.nombre="";
  }

  limpiarIdentificacion(){
    this.identificacion="";
  }
  consultarPorNombreIdentificacion(){
    this.usuarioService.consultarPorNombreIdentificacion(this.nombre, this.identificacion).subscribe(
      res => {
        this.usuarios=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_buscar_usuario, constantes.error_swal)
      }
    );
  }

  crearSuscripcion(){
    this.usuarioActualizar.suscripciones.push({ ... this.suscripcionCrear});
    this.suscripcionCrear=new Suscripcion();
  }

  pesoCrear(){
    let peso: Peso=new Peso();
    peso.valor=this.pesoActualizar;
    this.usuarioActualizar.pesos.push(peso);
    this.pesoActualizar=0;
  }

  observacionCrear(){
    let observacion: Observacion=new Observacion();
    observacion.descripcion=this.observacionActualizar;
    this.usuarioActualizar.observaciones.push(observacion);
    this.observacionActualizar="";
  }

  objetivoCrear(){
    let objetivo: Objetivo=new Objetivo();
    objetivo.descripcion=this.objetivoActualizar;
    this.usuarioActualizar.objetivos.push(objetivo);
    this.objetivoActualizar="";
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
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

  navegarExitoso() {
    this.router.navigate(['/leer-cliente']);
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
