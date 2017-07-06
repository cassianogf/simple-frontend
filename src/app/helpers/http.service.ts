import {Injectable } from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class HttpService extends Http {

  router: Router;

  constructor (backend: XHRBackend,
               options: RequestOptions,
               router: Router,
               ) {
    options.headers.set('Content-Type', 'application/json');
    super(backend, options);

  }


  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    } else {
    // we have to add the token to the url object
    }
    return super.request(url, options).catch(this.handleError(this));
  }

  private handleError (self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: any) => {
      let body = res._body

      try {
        body = JSON.parse(body)
        console.log(body)
      } catch(e) {
        body = res._body 
      }

      return Observable.throw(res);
    };
  }
}