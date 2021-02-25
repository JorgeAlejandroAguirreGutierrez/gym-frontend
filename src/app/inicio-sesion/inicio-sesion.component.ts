import { Component, OnInit } from '@angular/core';
import { Sesion } from '../modelos/sesion';
import { SesionService } from '../servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  sesion: Sesion=new Sesion();

  constructor(private sesionService: SesionService, private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    this.sesionService.crear(this.sesion).subscribe(
      res => {
        this.sesion=res;
        this.sesionService.setSesion(this.sesion);
        Swal.fire(constantes.exito, constantes.exito_iniciar_sesion, constantes.exito_swal);
        if(this.sesion.usuario.perfil.descripcion==constantes.perfil_admin){
          this.navegarAdmin();
        }
        if(this.sesion.usuario.perfil.descripcion==constantes.perfil_cliente){
          this.navegarCliente();
        }
      },
      error => {
        Swal.fire(constantes.error, constantes.error_iniciar_sesion, constantes.error_swal);
        this.navegarFallido();
      }
    );
  }

  navegarAdmin() {
    this.router.navigate(['/crear-cliente']);
  }

  navegarCliente() {
    this.router.navigate(['/leer-planentrenamiento']);
  }

  navegarFallido() {
    this.router.navigate(['/iniciar-sesion']);
  }

}
