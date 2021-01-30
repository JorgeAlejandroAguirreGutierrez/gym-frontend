import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { LeerClienteComponent } from './cliente/leer-cliente/leer-cliente.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: PrincipalComponent},
  { path: 'iniciar-sesion', component: InicioSesionComponent},
  { path: 'crear-cliente', component: CrearClienteComponent},
  { path: 'leer-cliente', component: LeerClienteComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
