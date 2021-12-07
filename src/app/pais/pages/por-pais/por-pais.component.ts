import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent implements OnInit {

  termino!: string

  constructor(private _paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar() {
    // console.log(this.termino);

    /** @nota aquí termino de hacer el subscribe que no hice en el servicio */
    this._paisService.buscarPais(this.termino)
        .subscribe(resp => {
          console.log(resp);
        })
  }

}
