import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent implements OnInit {

  termino!: string
  hayError!: boolean
  paises: Country[] = []

  constructor(private _paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.hayError = false
    this.termino = termino

    /** @nota aquí se temina de hacer el subscribe que no hice en el servicio */
    this._paisService.buscarPais(this.termino)
        .subscribe((paises) => {
          this.paises = paises
          console.log(this.paises);

          // paises[0].name.common
          // paises[0].capital
          // paises[0].flags.svg
          // paises[0].cca2
        }, (err) => {
          this.hayError = true
          this.paises = []
        })
  }

  sugerencias(termino: string){
    this.hayError = false
    // TODO: crear sugerencias
  }
}
