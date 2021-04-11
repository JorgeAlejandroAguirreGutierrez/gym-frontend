import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from 'src/app/modelos/ejercicio';
import { Rutina } from 'src/app/modelos/rutina';
import { EjercicioService } from 'src/app/servicios/ejercicio.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from '../../../environments/environment';
import * as util from '../../util';
import { Parametro } from 'src/app/modelos/parametro';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { TipoMusculo } from 'src/app/modelos/tipo-musculo';
import { TipoMusculoService } from 'src/app/servicios/tipo-musculo.service';
import { PlantillaPlan } from 'src/app/modelos/plantilla-plan';
import { Dia } from 'src/app/modelos/dia';
import { PlantillaPlanService } from 'src/app/servicios/plantilla-plan.service';

@Component({
  selector: 'app-crear-plantilla-plan',
  templateUrl: './crear-plantilla-plan.component.html',
  styleUrls: ['./crear-plantilla-plan.component.css']
})
export class CrearPlantillaPlanComponent implements OnInit {

  plantillaPlan: PlantillaPlan=new PlantillaPlan();
  cerrarModal: string = "";
  diaCrear: Dia=new Dia();
  rutinaCrear: Rutina=new Rutina();
  rutinaActualizar: Rutina=new Rutina();
  seleccionPE: number=-1;
  seleccionRE: number=-1;

  tiposMusculos: TipoMusculo[]=[];
  ejercicios: Ejercicio[]=[];
  medidasPesos: Parametro[]=[];
  medidasTiempos: Parametro[]=[];

  prefijoUrlEjercicios= environment.prefijo_url_ejercicios;

  tipoMusculoFuncional=constantes.parametroTipoMusculoFuncional;
  vacio=constantes.parametroVacio;

  @ViewChild('modalCrearRutina', { static: false }) private modalCrearRutina: any;
  @ViewChild('modalActualizarRutina', { static: false }) private modalActualizarRutina: any;
  @ViewChild('modalLeerEjercicio', { static: false }) private modalLeerEjercicio: any;

  constructor(private sesionService: SesionService, private plantillaPlanService: PlantillaPlanService,
    private ejercicioService: EjercicioService, private parametroService: ParametroService,
    private tipoMusculoService: TipoMusculoService,
    private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    util.loadScripts();
    let plantillaPlanId=this.route.snapshot.queryParamMap.get('id') || null as any;
    if(plantillaPlanId!=null){
      this.obtenerPlantillaPlan(plantillaPlanId);
    }
    this.consultarTiposMusculos();
    this.consultarMedidasPesos();
    this.consultarMedidasTiempos();
  }

  obtenerPlantillaPlan(plantillaPlanId:number){
    this.plantillaPlanService.obtener(plantillaPlanId).subscribe(
      res => {
        this.plantillaPlan=res;
        this.diaCrear=new Dia();
        this.desactivarAcordeon();
        this.plantillaPlan.plan.dias[this.plantillaPlan.plan.dias.length-1].show="show";
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, constantes.error_crear_plan, constantes.error_swal);
        }
      }
    );
  }

  abrirModalCrearRutina(i: number) {
    this.seleccionPE=i;
    this.open(this.modalCrearRutina);
  }

  abrirModalActualizarRutina(i: number, j:number) {
    this.seleccionPE=i;
    this.seleccionRE=j;
    this.rutinaActualizar={ ... this.plantillaPlan.plan.dias[this.seleccionPE].rutinas[this.seleccionRE]};
    this.open(this.modalActualizarRutina);
  }


  abrirModalLeerEjercicio(i:number, j:number){
    this.seleccionPE=i;
    this.seleccionRE=j;
    this.open(this.modalLeerEjercicio);
  }

  crearPlantillaPlan(){
    if(this.plantillaPlan.plan.dias.length==7){
      Swal.fire(constantes.error, constantes.error_maximo_plan, constantes.error_swal)
      return;
    }
    let numero: number=this.plantillaPlan.plan.dias.length+1;
    this.diaCrear.numero=numero;
    this.diaCrear.nombre=util.dia.get("DIA"+numero)!;
    this.plantillaPlan.plan.dias.push(this.diaCrear);
    this.plantillaPlanService.actualizar(this.plantillaPlan).subscribe(
      res => {
        this.plantillaPlan=res;
        this.diaCrear=new Dia();
        this.desactivarAcordeon();
        this.plantillaPlan.plan.dias[this.plantillaPlan.plan.dias.length-1].show="show";
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, constantes.error_crear_plan, constantes.error_swal);
        }
      }
    );
  }

  crearRutina(){
    if(this.rutinaCrear.ejercicio.tipoMusculo.descripcion!=this.tipoMusculoFuncional){
      this.rutinaCrear.valorTiempo=0;
      this.rutinaCrear.medidaTiempo="";
    }
    if(this.rutinaCrear.ejercicio.tipoMusculo.descripcion==this.tipoMusculoFuncional){
      this.rutinaCrear.repeticiones=0;
      this.rutinaCrear.veces=0;
      this.rutinaCrear.valorPeso=0;
      this.rutinaCrear.medidaPeso="";
    }
    this.plantillaPlan.plan.dias[this.seleccionPE].rutinas.push({... this.rutinaCrear})
    this.plantillaPlanService.actualizar(this.plantillaPlan).subscribe(
      res => {
        this.plantillaPlan=res;
        this.rutinaCrear=new Rutina();
        this.desactivarAcordeon();
        this.plantillaPlan.plan.dias[this.seleccionPE].show="show";
        this.modalService.dismissAll();
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, constantes.error_actualizar_rutina, constantes.error_swal);
        }
      }
    );
  }

  actualizarRutina(){
    if(this.rutinaActualizar.ejercicio.tipoMusculo.descripcion!=this.tipoMusculoFuncional){
      this.rutinaActualizar.valorTiempo=0;
      this.rutinaActualizar.medidaTiempo="";
    }
    if(this.rutinaActualizar.ejercicio.tipoMusculo.descripcion==this.tipoMusculoFuncional){
      this.rutinaActualizar.repeticiones=0;
      this.rutinaActualizar.veces=0;
      this.rutinaActualizar.valorPeso=0;
      this.rutinaActualizar.medidaPeso="";
    }
    this.plantillaPlan.plan.dias[this.seleccionPE].rutinas[this.seleccionRE]=({... this.rutinaActualizar})
    this.plantillaPlanService.actualizar(this.plantillaPlan).subscribe(
      res => {
        this.plantillaPlan=res;
        this.rutinaActualizar=new Rutina();
        this.desactivarAcordeon();
        this.plantillaPlan.plan.dias[this.seleccionPE].show="show";
        this.modalService.dismissAll();
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, constantes.error_actualizar_usuario, constantes.error_swal);
        }
        
      }
    );
  }

  eliminarRutina(i: number, j:number){
    this.seleccionPE=i;
    this.seleccionRE=j;
    this.plantillaPlan.plan.dias[this.seleccionPE].rutinas.splice(this.seleccionRE, 1);
    this.plantillaPlanService.actualizar(this.plantillaPlan).subscribe(
      res => {
        this.plantillaPlan=res;
        this.desactivarAcordeon();
        this.plantillaPlan.plan.dias[this.seleccionPE].show="show";
        this.modalService.dismissAll();
        Swal.fire(constantes.exito, constantes.exito_eliminar_rutina, constantes.exito_swal)
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, constantes.error_eliminar_rutina, constantes.error_swal)
        }
      }
    );
  }

  consultarTiposMusculos(){
    this.tipoMusculoService.consultar().subscribe(
      res => {
        this.tiposMusculos=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_musculos, constantes.error_swal)
      }
    );
  }

  cargarEjerciciosCrearRutina(){
    console.log(this.rutinaCrear);
    let tipoMusculoId=this.rutinaCrear.ejercicio.tipoMusculo.id.toString();
    this.consultarEjerciciosPorTipoMusculo(tipoMusculoId);
  }

  cargarEjerciciosCrearActualizar(){
    let tipoMusculoId=this.rutinaActualizar.ejercicio.tipoMusculo.id.toString();
    this.consultarEjerciciosPorTipoMusculo(tipoMusculoId);
  }

  consultarEjerciciosPorTipoMusculo(tipoMusculoId: string){
    this.ejercicioService.consultarPorTipoMusculo(tipoMusculoId).subscribe(
      res => {
        this.ejercicios=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_ejercicios, constantes.error_swal)
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

  consultarMedidasTiempos(){
    this.parametroService.consultarPorTipo(constantes.parametroMedidaTiempo).subscribe(
      res => {
        this.medidasTiempos=res;
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
    for(let i=0; i<this.plantillaPlan.plan.dias.length; i++){
      this.plantillaPlan.plan.dias[i].show="";
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
