import {Injectable } from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router, CanActivate } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class HttpService extends Http {

  router: Router;
  _service: NotificationsService

  constructor (backend: XHRBackend,
               options: RequestOptions,
               router: Router,
               _service: NotificationsService
               ) {
    options.headers.set('Content-Type', 'application/json');
    options.headers.set('Access-Control-Allow-Origin', '*');
    super(backend, options);
    this.router = router
    this._service = _service;

  }


  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch(this.handleError(this));
  }

  private handleError (self: HttpService) {


    return (res: any) => {
      let body = res._body

      try {
        body = JSON.parse(body)
        console.log(body)
      } catch(e) {
        body = res._body 
      }

      if (res.status != 200) {
        //Notificate
        this._service.error(
                'Erro!',
                'Falha no processamento da requisição',
                {
                    showProgressBar: true,
                    pauseOnHover: false,
                    clickToClose: false,
                    maxLength: 50
                }
        )
      }

      return Observable.throw(res);
    };
  }
}