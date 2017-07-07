import { Component, ViewChild } from '@angular/core'

import { Observable } from 'rxjs/Observable'

import { Produto } from './produto'
import { ProdutoService } from './produto.service'
import { ProdutoFormComponent } from './produto-form.component'
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
	selector: 'produto',
    templateUrl: './produto.component.html',
    styleUrls: [ './produto.component.css', ],	
})

export class ProdutoComponent {
	produtos: Observable<Produto[]> 

	remove(produto: Produto) {
		this.produtoService.remove(produto.id)
	}

	edit(produto: Produto) {
		
	}

	create() {
		let produto: Produto = new Produto()
		produto.name =	String(this.produtoService.getProdutosLength())
		this.produtoService.create(produto)
	} 
	
	ngOnInit(){
		this.produtos = this.produtoService.produtos
		this.produtoService.load()
	}

	constructor(public dialog: MdDialog,
	  private produtoService: ProdutoService,
	) {}
}