import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from 'src/app/modelos/ejercicio';
import { TipoMusculo } from 'src/app/modelos/tipo-musculo';
import { EjercicioService } from 'src/app/servicios/ejercicio.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { TipoMusculoService } from 'src/app/servicios/tipo-musculo.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-leer-ejercicio',
  templateUrl: './leer-ejercicio.component.html',
  styleUrls: ['./leer-ejercicio.component.css']
})
export class LeerEjercicioComponent implements OnInit {

  ejercicios: Ejercicio[]=[];
  ejercicioBuscar: Ejercicio=new Ejercicio();
  ejercicioActualizar: Ejercicio=new Ejercicio();

  tiposMusculo: TipoMusculo[]=[];

  cerrarModal: string="";

  @ViewChild('modalEjercicioActualizar', { static: false }) private modalEjercicioActualizar: any;

  constructor(private ejercicioService: EjercicioService, private tipoMusculoService: TipoMusculoService,
    private sesionService: SesionService, private router: Router, private modalService: NgbModal) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.validarSesion();
    this.consultarEjercicios();
  }

  consultarTiposMuculo(){
    this.tipoMusculoService.consultar().subscribe(
      res => {
        this.tiposMusculo = res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_musculos, constantes.error_swal)
      }
    );
  }

  consultarEjercicios(){
    this.ejercicioService.consultar().subscribe(
      res => {
        this.ejercicios = res;
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

  editar(i: number){
    this.ejercicioActualizar={ ... this.ejercicios[i]};
    this.open(this.modalEjercicioActualizar);
  }

  actualizar(){
    console.log(this.ejercicioActualizar);
    this.ejercicioService.actualizar(this.ejercicioActualizar).subscribe(
      res => {
        this.modalService.dismissAll();
        Swal.fire(constantes.exito, constantes.exito_actualizar_ejercicio, constantes.exito_swal)
        this.consultarEjercicios();
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  buscar(){
    console.log(this.ejercicioBuscar);
    this.ejercicioService.buscar(this.ejercicioBuscar).subscribe(
      res => {
        this.ejercicios=res;
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

  navegarExitoso() {
    this.router.navigate(['/leer-ejercicio']);
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
