import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'

import { Funcionario } from './funcionario'
import { FuncionarioService } from './funcionario.service'

@Component({
  selector: 'funcionario-form',
  templateUrl: 'funcionario-form.component.html',
})

export class FuncionarioFormComponent {
	model: Funcionario

	onSubmit() {
		this.funcionarioService.create(this.model)
			.then(res => {
				this.router.navigate(['/funcionarios'])
			})
	}

	ngOnInit() {
		this.model = new Funcionario()
	}

	constructor(private funcionarioService: FuncionarioService,
		private router: Router) {

	}
}