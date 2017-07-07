import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate  } from '@angular/router'

import { MesaComponent } from './mesa/mesa.component'
import { ProdutoComponent } from './produto/produto.component'
import { ProdutoFormComponent } from './produto/produto-form.component'
import { FuncionarioComponent } from './funcionario/funcionario.component'
import { FuncionarioFormComponent } from './funcionario/funcionario-form.component'

const routes: Routes = [
  { path: '', redirectTo: 'mesas', pathMatch: 'full'},
  { path: 'mesas', component: MesaComponent },
  { path: 'produtos', component: ProdutoComponent },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'funcionarios', component: FuncionarioComponent },
  { path: 'funcionarios/novo', component: FuncionarioFormComponent },
];

@NgModule( {
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
