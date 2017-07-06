import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate  } from '@angular/router'

import { MesaComponent } from './mesa/mesa.component'

const routes: Routes = [
  { path: '', redirectTo: 'mesas', pathMatch: 'full'},
  { path: 'mesas', component: MesaComponent },
  { path: 'produtos', component: MesaComponent },
  /*{ path: 'setup',  component: SetupComponent, canActivate: [AuthGuard] },
  { path: 'agenda',  component: AgendaComponent, canActivate: [AuthGuard, SubscriptionGuard] },
  { path: 'logout',  component: AuthComponent, canActivate: [AuthGuard] },*/
];

@NgModule( {
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
