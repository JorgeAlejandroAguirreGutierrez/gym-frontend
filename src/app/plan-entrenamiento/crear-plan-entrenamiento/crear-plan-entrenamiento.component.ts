import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from 'src/app/modelos/ejercicio';
import { PlanEntrenamiento } from 'src/app/modelos/plan-entrenamiento';
import { RutinaEntrenamiento } from 'src/app/modelos/rutina-entrenamiento';
import { Usuario } from 'src/app/modelos/usuario';
import { EjercicioService } from 'src/app/servicios/ejercicio.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from '../../../environments/environment';
import * as util from '../../util';
import { Parametro } from 'src/app/modelos/parametro';
import { ParametroService } from 'src/app/servicios/parametro.service';

@Component({
  selector: 'app-crear-plan-entrenamiento',
  templateUrl: './crear-plan-entrenamiento.component.html',
  styleUrls: ['./crear-plan-entrenamiento.component.css']
})
export class CrearPlanEntrenamientoComponent implements OnInit {

  identificacion: string="";
  usuario: Usuario=new Usuario();
  cerrarModal: string = "";
  planEntrenamientoCrear: PlanEntrenamiento=new PlanEntrenamiento();
  rutinaEntrenamientoCrear: RutinaEntrenamiento=new RutinaEntrenamiento();
  rutinaEntrenamientoActualizar: RutinaEntrenamiento=new RutinaEntrenamiento();
  seleccionPE: number=-1;
  seleccionRE: number=-1;

  ejercicios: Ejercicio[]=[];
  medidasPesos: Parametro[]=[];

  prefijoUrlEjercicios= environment.prefijo_url_ejercicios;

  @ViewChild('modalCrearRutinaEntrenamiento', { static: false }) private modalCrearRutinaEntrenamiento: any;
  @ViewChild('modalActualizarRutinaEntrenamiento', { static: false }) private modalActualizarRutinaEntrenamiento: any;
  @ViewChild('modalLeerEjercicio', { static: false }) private modalLeerEjercicio: any;

  constructor(private sesionService: SesionService, private usuarioService: UsuarioService,
    private ejercicioService: EjercicioService, private parametroService: ParametroService,
    private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.identificacion=this.route.snapshot.queryParamMap.get('identificacion') || null as any;
    console.log(this.identificacion);
    if(this.identificacion==null){
      this.navegarIndex();
    }
    this.obtenerPorIdentificacion();
    this.consultarEjercicios();
    this.consultarMedidasPesos();
  }

  obtenerPorIdentificacion(){
    this.usuarioService.obtenerPorIdentificacion(this.identificacion).subscribe(
      res => {
        this.usuario=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_obtener_usuario, constantes.error_swal)
      }
    );
  }

  abrirModalCrearRutinaEntrenamiento(i: number) {
    this.seleccionPE=i;
    this.open(this.modalCrearRutinaEntrenamiento);
  }

  abrirModalActualizarRutinaEntrenamiento(i: number, j:number) {
    this.seleccionPE=i;
    this.seleccionRE=j;
    this.rutinaEntrenamientoActualizar={ ... this.usuario.planesEntrenamiento[this.seleccionPE].rutinasEntrenamiento[this.seleccionRE]};
    this.open(this.modalActualizarRutinaEntrenamiento);
  }


  abrirModalLeerEjercicio(i:number, j:number){
    this.seleccionPE=i;
    this.seleccionRE=j;
    this.open(this.modalLeerEjercicio);
  }

  crearPlanEntrenamiento(){
    if(this.usuario.planesEntrenamiento.length==7){
      Swal.fire(constantes.error, constantes.error_maximo_plan_entrenamiento, constantes.error_swal)
    }
    let numero: number=this.usuario.planesEntrenamiento.length+1;
    this.planEntrenamientoCrear.numero=numero;
    this.planEntrenamientoCrear.dia=util.dia.get("DIA"+numero)!;
    this.usuario.planesEntrenamiento.push(this.planEntrenamientoCrear);
    console.log(this.usuario);
    this.usuarioService.actualizar(this.usuario).subscribe(
      res => {
        this.usuario=res;
        this.planEntrenamientoCrear=new PlanEntrenamiento();
        this.desactivarAcordeon();
        this.usuario.planesEntrenamiento[this.usuario.planesEntrenamiento.length-1].show="show";
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_plan_entrenamiento, constantes.error_swal)
      }
    );
  }

  crearRutinaEntrenamiento(){
    this.usuario.planesEntrenamiento[this.seleccionPE].rutinasEntrenamiento.push({... this.rutinaEntrenamientoCrear})
    console.log(this.usuario);
    this.usuarioService.actualizar(this.usuario).subscribe(
      res => {
        this.usuario=res;
        this.rutinaEntrenamientoCrear=new RutinaEntrenamiento();
        this.desactivarAcordeon();
        this.usuario.planesEntrenamiento[this.seleccionPE].show="show";
        this.modalService.dismissAll();
      },
      err => {
        Swal.fire(constantes.error, constantes.error_actualizar_rutina, constantes.error_swal)
      }
    );
  }

  actualizarRutinaEntrenamiento(){
    this.usuario.planesEntrenamiento[this.seleccionPE].rutinasEntrenamiento[this.seleccionRE]=({... this.rutinaEntrenamientoActualizar})
    console.log(this.usuario.planesEntrenamiento);
    this.usuarioService.actualizar(this.usuario).subscribe(
      res => {
        this.usuario=res;
        this.rutinaEntrenamientoActualizar=new RutinaEntrenamiento();
        this.desactivarAcordeon();
        this.usuario.planesEntrenamiento[this.seleccionPE].show="show";
        this.modalService.dismissAll();
      },
      err => {
        Swal.fire(constantes.error, constantes.error_actualizar_usuario, constantes.error_swal)
      }
    );
  }

  eliminarRutinaEntrenamiento(i: number, j:number){
    this.seleccionPE=i;
    this.seleccionRE=j;
    this.usuario.planesEntrenamiento[this.seleccionPE].rutinasEntrenamiento.splice(this.seleccionRE, 1);
    console.log(this.usuario);
    this.usuarioService.actualizar(this.usuario).subscribe(
      res => {
        this.usuario=res;
        this.desactivarAcordeon();
        this.usuario.planesEntrenamiento[this.seleccionPE].show="show";
        this.modalService.dismissAll();
        Swal.fire(constantes.exito, constantes.exito_eliminar_rutina, constantes.exito_swal)
      },
      err => {
        Swal.fire(constantes.error, constantes.error_eliminar_rutina, constantes.error_swal)
      }
    );
  }

  consultarEjercicios(){
    this.ejercicioService.consultar().subscribe(
      res => {
        this.ejercicios=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_obtener_usuario, constantes.error_swal)
      }
    );
  }

  consultarMedidasPesos(){
    this.parametroService.consultarPorTipo(constantes.parametroMedidaPeso).subscribe(
      res => {
        this.medidasPesos=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_medidas_pesos, constantes.error_swal)
      }
    );
  }

  compareFn(a:any, b:any) {
    return a && b && a.id == b.id;
  }

  desactivarAcordeon(){
    for(let i=0; i<this.usuario.planesEntrenamiento.length; i++){
      this.usuario.planesEntrenamiento[i].show="";
    }
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
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
