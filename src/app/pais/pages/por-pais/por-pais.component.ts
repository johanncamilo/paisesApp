import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }

    `
  ]
})
export class PorPaisComponent implements OnInit {

  termino!: string
  hayError!: boolean
  paises: Country[] = []
  paisesSugeridos: Country[] = []
  mostrarSugerencias: boolean = false

  constructor(private _paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.mostrarSugerencias = false
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
    this.termino = termino
    this.mostrarSugerencias = true
    
    // TODO: crear sugerencias
    this._paisService.buscarPais(termino)
        .subscribe(paises => {
          this.paisesSugeridos = paises.splice(0,5)          
          console.log(paises);
        },(err) => this.paisesSugeridos = [])
  }

  buscarSugerido(termino: string) {
    this.buscar(termino)
  }
}

/**
 * @notas 27Dic/2021
 * *  PASO A PASO SUGERENCIAS
 * #1 crear HTML ul>li debajo del input en la vista por-pais
 * #2 en el css ponerle a li cursor pointer
 * #3 en sugerencias() de por-pais usar buscar() del servicio con subscribe()
 * #4 crear array paisesSugeridos: Country[] y asignarle el splice de la respuesta del subscribe
 * #5 hacer ngFor en la vista tomando a paisesSugeridos[]
 * #6 crear un a con routerLink en cada li del ngFor hacia '/pais'
 * #7 copiar el li, quitarle el ngFor y routerLink, ponerle buscar "{{ termino }}", poner onClick buscarSugerido(termino)
 * * Ocultar Condicionalmente Las Sugerencias
 * #8 en el componente crear buscarSugerido() y attr mostrarSugerencias: boolean = false
 * #9 poner this.mostrarSugerencias = false en buscar()
 * #10 poner this.mostrarSugerencias = true en sugerencias(), para mostrar las sugerencias solo cuando se empieza a escribir
 * #11 poner <ul *ngIf="mostrarSugerencias"
 */