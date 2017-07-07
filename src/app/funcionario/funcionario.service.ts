import { Injectable, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

import { Funcionario } from './funcionario'

import { HttpService } from '../helpers/http.service'
import { Database } from '../config/database'

@Injectable()
export class FuncionarioService {
  funcionarios: Observable<Funcionario[]>
  private _funcionarios: BehaviorSubject<Funcionario[]>;
  private baseUrl: string;
  private dataStore: {
    funcionarios: Funcionario[]
  }

  constructor(private http: HttpService,
              private database: Database,
    ) {
    this.baseUrl = this.database.URL
    this.dataStore = { funcionarios: [] }
    this._funcionarios = <BehaviorSubject<Funcionario[]>>new BehaviorSubject([])
    this.funcionarios = this._funcionarios.asObservable();
  }

  //================================================================================================
  // CRUD
  //================================================================================================

  load() {
    this.http.get(`${this.baseUrl}/funcionarios`).map(response => response.json()).subscribe(data => {
      this.dataStore.funcionarios = data;
      this._funcionarios.next(Object.assign({}, this.dataStore).funcionarios);
    }, error => console.log('Could not load funcionarios.'));
  }

  create(funcionario: Funcionario): Promise<Funcionario> {

    return this.http
      .post(`${this.baseUrl}/funcionarios`, JSON.stringify(funcionario))
      .toPromise()
      .then(res => {
        this.dataStore.funcionarios.push(res.json());
        this._funcionarios.next(Object.assign({}, this.dataStore).funcionarios);
        return res.json()
      })
      .catch(err => this.handleError(err));
  }

  update(funcionario: Funcionario): Promise<Funcionario> {
    return this.http
      .put(`${this.baseUrl}/funcionarios/${funcionario.id}`, JSON.stringify(funcionario))
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(err => this.handleError(err));
  }

  remove(funcionarioId: number): Promise<boolean> {
    return this.http
      .delete(`${this.baseUrl}/funcionarios/${funcionarioId}`)
      .toPromise()
      .then(response => {
        this.dataStore.funcionarios.forEach((t, i) => {
          if (t.id === funcionarioId) { this.dataStore.funcionarios.splice(i, 1); }
        });

        this._funcionarios.next(Object.assign({}, this.dataStore).funcionarios);
        return true;
      })
      .catch(err => this.handleError(err));
  }

  show(id: number): Promise<Funcionario> {
    return this.http 
      .get(`${this.baseUrl}/funcionarios/${id}`)
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(err => this.handleError(err))
  }

  reorder() {
    return this.http.post(`${this.baseUrl}/funcionarios/reorder`, JSON.stringify({})).toPromise()
    .then(response => {
      this.load()
    })
    .catch(err => this.handleError(err))
  }

  getFuncionariosLength() {
    return this.dataStore.funcionarios.length + 1
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
