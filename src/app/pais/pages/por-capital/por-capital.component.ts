import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  termino!: string
  hayError!: boolean
  paises: Country[] = []

  constructor(private _paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.hayError = false
    this.termino = termino

    // todo: crear y llamar servicio
    this._paisService.buscarXCapital(this.termino)
        .subscribe((paises) => {
          this.paises = paises
          console.log(this.paises);
          
        }, (err) => {
          this.hayError = true
          this.paises = []
        })
  }

  sugerencias(termino: string) {
    console.log('sugerencias capital coming soon');
    
    this.hayError = false
    // TODO: crear sugerencias
  }

}
