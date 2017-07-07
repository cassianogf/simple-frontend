import { Component, ViewChild } from '@angular/core'

import { Observable } from 'rxjs/Observable'

import { Funcionario } from './funcionario'
import { FuncionarioService } from './funcionario.service'
import { FuncionarioFormComponent } from './funcionario-form.component'
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
	selector: 'funcionario',
    templateUrl: './funcionario.component.html',
    styleUrls: [ './funcionario.component.css', ],	
})

export class FuncionarioComponent {
	funcionarios: Observable<Funcionario[]> 

	remove(funcionario: Funcionario) {
		this.funcionarioService.remove(funcionario.id)
	}

	edit(funcionario: Funcionario) {
		
	}

	create() {
		let funcionario: Funcionario = new Funcionario()
		funcionario.name =	String(this.funcionarioService.getFuncionariosLength())
		this.funcionarioService.create(funcionario)
	} 
	
	ngOnInit(){
		this.funcionarios = this.funcionarioService.funcionarios
		this.funcionarioService.load()
	}

	constructor(public dialog: MdDialog,
	  private funcionarioService: FuncionarioService,
	) {}
}