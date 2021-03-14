import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ParametroService } from '../servicios/parametro.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';
import { Parametro } from '../modelos/parametro';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  prefijoUrlImagenes = environment.prefijo_url_imagenes;

  sliders: Parametro[]=[new Parametro(), new Parametro(), new Parametro()];

  servicios: Parametro[]=[new Parametro(), new Parametro(), new Parametro()];

  descripciones: Parametro[]=[new Parametro(), new Parametro(), new Parametro()];

  constructor(private parametroService: ParametroService) { }

  ngOnInit(): void {
    this.consultarSliders();
    this.consultarServicios();
    this.consultarDescripciones();
  }

  consultarSliders(){
    this.parametroService.consultarPorTipo(constantes.parametroSlider).subscribe(
      res => {
        this.sliders=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_sliders, constantes.error_swal)
      }
    );
  }

  consultarServicios(){
    this.parametroService.consultarPorTipo(constantes.parametroServicio).subscribe(
      res => {
        this.servicios=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_servicios, constantes.error_swal)
      }
    );
  }

  consultarDescripciones(){
    this.parametroService.consultarPorTipo(constantes.parametroDescripcion).subscribe(
      res => {
        this.descripciones=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_descripciones, constantes.error_swal)
      }
    );
  }

}
