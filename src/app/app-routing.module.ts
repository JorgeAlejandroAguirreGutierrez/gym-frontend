import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { LeerClienteComponent } from './cliente/leer-cliente/leer-cliente.component';
import { CrearEjercicioComponent } from './ejercicio/crear-ejercicio/crear-ejercicio.component';
import { LeerEjercicioComponent } from './ejercicio/leer-ejercicio/leer-ejercicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CrearPlanEntrenamientoComponent } from './plan-entrenamiento/crear-plan-entrenamiento/crear-plan-entrenamiento.component';
import { LeerPlanEntrenamientoComponent } from './plan-entrenamiento/leer-plan-entrenamiento/leer-plan-entrenamiento.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: PrincipalComponent},
  { path: 'iniciar-sesion', component: InicioSesionComponent},
  { path: 'crear-cliente', component: CrearClienteComponent},
  { path: 'leer-cliente', component: LeerClienteComponent},
  { path: 'crear-ejercicio', component: CrearEjercicioComponent},
  { path: 'leer-ejercicio', component: LeerEjercicioComponent},
  { path: 'crear-plan-entrenamiento', component: CrearPlanEntrenamientoComponent},
  { path: 'leer-plan-entrenamiento', component: LeerPlanEntrenamientoComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
