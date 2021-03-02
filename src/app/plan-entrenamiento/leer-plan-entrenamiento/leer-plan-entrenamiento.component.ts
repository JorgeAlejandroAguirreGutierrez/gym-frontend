import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-leer-plan-entrenamiento',
  templateUrl: './leer-plan-entrenamiento.component.html',
  styleUrls: ['./leer-plan-entrenamiento.component.css']
})
export class LeerPlanEntrenamientoComponent implements OnInit {

  identificacion:string="";

  constructor(private sesionService: SesionService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.identificacion=this.route.snapshot.queryParamMap.get('identificacion') || null as any;
    console.log(this.identificacion);
    if(this.identificacion==null){
      this.navegarIndex();
    }
    
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
