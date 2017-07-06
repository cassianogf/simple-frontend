import { Component } from '@angular/core'

import { Observable } from 'rxjs/Observable'

import { Mesa } from './mesa'
import { MesaService } from './mesa.service'

@Component({
	selector: 'mesa',
    templateUrl: './mesa.component.html',
    styleUrls: [ './mesa.component.css', ],	
})

export class MesaComponent {
	mesas: Mesa[] = []
	_mesas: Observable<Mesa[]> 

	open(mesa: Mesa) {
		mesa.status = 'bus'
		this.mesaService.update(mesa)
	}

	close(mesa: Mesa) {
		mesa.status = 'fre'
		this.mesaService.update(mesa)
	}

	reserve(mesa: Mesa) {
		mesa.status = 'res'
		this.mesaService.update(mesa)
	}

	remove(mesa: Mesa) {
		this.mesaService.remove(mesa.id)
	}

	create() {
		let mesa: Mesa = new Mesa()
		mesa.id = this.mesas.length + 1
		mesa.name = String(this.mesas.length + 1)
		mesa.status = 'fre'
		mesa.capacity = 1;
		this.mesaService.create(mesa)
	} 

	isFree(mesa: Mesa) {
		if(mesa.status == 'fre')
			return true;
		return false;
	}

	isReserved(mesa: Mesa) {
		if(mesa.status == 'res')
			return true;
		return false;
	}

	isBusy(mesa: Mesa) {
		if(mesa.status == 'bus')
			return true;
		return false;
	}

	getStatusBackground(status) {
		switch (status) {
			case 'fre':
				return "#27ae60"
			case 'res':
				return "#f39c12";
			case 'bus':
				return "#e74c3c";
			default:
				return "#ddd"
		}
	}
	ngOnInit(){
		this._mesas = this.mesaService.mesas
		this.mesaService.load()
	}

	  constructor(
	    private mesaService: MesaService,
	  ) {}
}