import { Injectable, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

import { Mesa } from './mesa'

import { HttpService } from '../helpers/http.service'
import { Database } from '../config/database'

@Injectable()
export class MesaService {
  mesas: Observable<Mesa[]>
  private _mesas: BehaviorSubject<Mesa[]>;
  private baseUrl: string;
  private dataStore: {
    mesas: Mesa[]
  }

  constructor(private http: HttpService,
              private database: Database,
    ) {
    this.baseUrl = this.database.URL
    this.dataStore = { mesas: [] }
    this._mesas = <BehaviorSubject<Mesa[]>>new BehaviorSubject([])
    this.mesas = this._mesas.asObservable();
  }

  //================================================================================================
  // CRUD
  //================================================================================================

  load() {
    this.http.get(`${this.baseUrl}/mesas`).map(response => response.json()).subscribe(data => {
      this.dataStore.mesas = data;
      this._mesas.next(Object.assign({}, this.dataStore).mesas);
    }, error => console.log('Could not load mesas.'));
  }

  create(mesa: Mesa): Promise<Mesa> {
    return this.http
      .post(`${this.baseUrl}/mesas`, JSON.stringify(mesa))
      .toPromise()
      .then(res => {
        this.dataStore.mesas.push(res.json());
        this._mesas.next(Object.assign({}, this.dataStore).mesas);
        return res.json()
      })
      .catch(err => this.handleError(err));
  }

  update(mesa: Mesa): Promise<Mesa> {
    return this.http
      .put(`${this.baseUrl}/mesas/${mesa.id}`, JSON.stringify(mesa))
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(err => this.handleError(err));
  }

  remove(mesaId: number): Promise<boolean> {
    return this.http
      .delete(`${this.baseUrl}/mesas/${mesaId}`)
      .toPromise()
      .then(response => {
        this.dataStore.mesas.forEach((t, i) => {
          if (t.id === mesaId) { this.dataStore.mesas.splice(i, 1); }
        });

        this._mesas.next(Object.assign({}, this.dataStore).mesas);
        return true;
      })
      .catch(err => this.handleError(err));
  }

  show(id: number): Promise<Mesa> {
    return this.http 
      .get(`${this.baseUrl}/mesas/${id}`)
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(err => this.handleError(err))
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
