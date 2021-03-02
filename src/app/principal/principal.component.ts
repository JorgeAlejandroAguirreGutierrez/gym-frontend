import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  prefijoUrlImagenes = environment.prefijo_url_imagenes;

  sliders: string[]=["slider1.jpeg", "slider2.jpeg", "slider3.jpeg"];

  servicios: string[]=["servicio1.jpeg", "servicio2.jpeg", "servicio3.jpeg"];

  constructor() { }

  ngOnInit(): void {
  }

}
