import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule,  } from '@angular/core';
import { Router } from '@angular/router'
import { MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdMenuModule, MdIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module'

import { HttpModule, RequestOptions, XHRBackend }    from '@angular/http';
import { HttpService } from './helpers/http.service'

import { Database } from './config/database'

import { MesaComponent } from './mesa/mesa.component'
import { MesaService } from './mesa/mesa.service'

export function httpServiceFactory(backend: XHRBackend,
    options: RequestOptions,
    router: Router) {
  return new HttpService(backend, options, router);
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
    HttpModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    MesaComponent,
  ],
  providers: [
    Database,
    MesaService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, Router]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
