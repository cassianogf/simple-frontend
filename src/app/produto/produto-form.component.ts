import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'

import { Produto } from './produto'
import { ProdutoService } from './produto.service'

@Component({
  selector: 'produto-form',
  templateUrl: 'produto-form.component.html',
})

export class ProdutoFormComponent {
	model: Produto

	onSubmit() {
		this.produtoService.create(this.model)
			.then(res => {
				this.router.navigate(['/produtos'])
			})
	}

	ngOnInit() {
		this.model = new Produto()
	}

	constructor(private produtoService: ProdutoService,
		private router: Router) {

	}
}