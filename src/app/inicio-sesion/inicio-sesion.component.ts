import { Component, OnInit } from '@angular/core';
import { SesionCliente } from '../modelos/sesion-cliente';
import { SesionClienteService } from '../servicios/sesion-cliente.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  sesionCliente: SesionCliente=new SesionCliente();

  constructor(private sesionClienteService: SesionClienteService, private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    this.sesionClienteService.crear(this.sesionCliente).subscribe(
      res => {
        this.sesionCliente=res;
        this.sesionClienteService.setSesion(this.sesionCliente);
        Swal.fire(constantes.exito, constantes.exito_iniciar_sesion, constantes.exito_swal);
      },
      error => Swal.fire(constantes.error, constantes.error_iniciar_sesion, constantes.error_swal),
      () => this.navigate()
    );
  }

  navigate() {
    this.router.navigateByUrl('/iniciar-sesion');
  }

}
