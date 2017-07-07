import { Injectable, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

import { Produto } from './produto'

import { HttpService } from '../helpers/http.service'
import { Database } from '../config/database'

@Injectable()
export class ProdutoService {
  produtos: Observable<Produto[]>
  private _produtos: BehaviorSubject<Produto[]>;
  private baseUrl: string;
  private dataStore: {
    produtos: Produto[]
  }

  constructor(private http: HttpService,
              private database: Database,
    ) {
    this.baseUrl = this.database.URL
    this.dataStore = { produtos: [] }
    this._produtos = <BehaviorSubject<Produto[]>>new BehaviorSubject([])
    this.produtos = this._produtos.asObservable();
  }

  //================================================================================================
  // CRUD
  //================================================================================================

  load() {
    this.http.get(`${this.baseUrl}/produtos`).map(response => response.json()).subscribe(data => {
      this.dataStore.produtos = data;
      this._produtos.next(Object.assign({}, this.dataStore).produtos);
    }, error => console.log('Could not load produtos.'));
  }

  create(produto: Produto): Promise<Produto> {

    return this.http
      .post(`${this.baseUrl}/produtos`, JSON.stringify(produto))
      .toPromise()
      .then(res => {
        this.dataStore.produtos.push(res.json());
        this._produtos.next(Object.assign({}, this.dataStore).produtos);
        return res.json()
      })
      .catch(err => this.handleError(err));
  }

  update(produto: Produto): Promise<Produto> {
    return this.http
      .put(`${this.baseUrl}/produtos/${produto.id}`, JSON.stringify(produto))
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(err => this.handleError(err));
  }

  remove(produtoId: number): Promise<boolean> {
    return this.http
      .delete(`${this.baseUrl}/produtos/${produtoId}`)
      .toPromise()
      .then(response => {
        this.dataStore.produtos.forEach((t, i) => {
          if (t.id === produtoId) { this.dataStore.produtos.splice(i, 1); }
        });

        this._produtos.next(Object.assign({}, this.dataStore).produtos);
        return true;
      })
      .catch(err => this.handleError(err));
  }

  show(id: number): Promise<Produto> {
    return this.http 
      .get(`${this.baseUrl}/produtos/${id}`)
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(err => this.handleError(err))
  }

  reorder() {
    return this.http.post(`${this.baseUrl}/produtos/reorder`, JSON.stringify({})).toPromise()
    .then(response => {
      this.load()
    })
    .catch(err => this.handleError(err))
  }

  getProdutosLength() {
    return this.dataStore.produtos.length + 1
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }
}
