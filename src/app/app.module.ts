import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule,  } from '@angular/core';
import { Router } from '@angular/router'
import { FormsModule }   from '@angular/forms';
import { MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdMenuModule, MdIconModule,
 MdSidenavModule, MdDialogModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module'

import { HttpModule, RequestOptions, XHRBackend }    from '@angular/http';
import { HttpService } from './helpers/http.service'

import { Database } from './config/database'

import { MesaComponent } from './mesa/mesa.component'
import { MesaService } from './mesa/mesa.service'

import { ProdutoComponent } from './produto/produto.component'
import { ProdutoFormComponent } from './produto/produto-form.component'
import { ProdutoService } from './produto/produto.service'

import { FuncionarioComponent } from './funcionario/funcionario.component'
import { FuncionarioFormComponent } from './funcionario/funcionario-form.component'
import { FuncionarioService } from './funcionario/funcionario.service'



export function httpServiceFactory(backend: XHRBackend,
    options: RequestOptions,
    router: Router,
    service: NotificationsService) {
  return new HttpService(backend, options, router, service);
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdToolbarModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdIconModule,
    MdSidenavModule,
    MdDialogModule,
    MdInputModule,
    HttpModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    MesaComponent,
    ProdutoComponent,
    ProdutoFormComponent,
    FuncionarioComponent,
    FuncionarioFormComponent,

  ],
  providers: [
    Database,
    MesaService,
    FuncionarioService,
    ProdutoService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, Router, NotificationsService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
