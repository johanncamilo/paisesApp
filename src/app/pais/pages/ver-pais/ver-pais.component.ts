import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country

  constructor(private _activatedRoute: ActivatedRoute,
              private _paisService: PaisService) { }

  ngOnInit(): void {


    // * OPERADORES RXJS EN PIPE
    this._activatedRoute.params
        .pipe(
          switchMap(({ id }) => this._paisService.paisXAlpha(id)), // recibe el valor del observable anterior y retorna un nuevo observable "hace ese switch ese cambio", return implicito
          tap(console.log)
        )
        .subscribe( (pais: Country[]) => this.pais = pais[0] )
        // this.pais.idd

    // * OLD WAY
    /**
     * @recordatorio_desestructuración
     * (params)... params.id = ({ id })... id
     */
    // this._activatedRoute.params
    //   .subscribe(({ id }) => {
    //     console.log(id);
        
    //     ? OBSERVABLE ANIDADO
    //     this._paisService.paisXAlpha(id)
    //       .subscribe(pais => {
    //         console.log(pais);
            
    //       })
    //   })
  }

}


/**
 * * NOTAS "observer anidado" 08Dic/2021
 * trabajar con un observable es decir subscribirse a los cambios de url en una nueva emisión

    PASOS EN ver-pais.component.ts

    #1 declarar una propiedad ActivatedRoute en el constructor, es un observable

    #2 Suscribirse en ngOnInit de ver-pais.component.ts usando _activatedRoute

    #3 usar desestructuración con el argumento del subscribe

    #4 crear nueva fx en el service getXAlpha con retorno de un sólo país, copiar de buscarXCapital reemplazar termino y la url

    #5 inyectar pais-service en constructor

    #6 hacer otro observable para traer la info del país
 */

/**
 * *NOTAS RXJS 09Dic/2021
 * #1 escribir de nuevo observable this._activadedRoute.params.subscribe()
 * #2 importar switchMap de rxjs/operators -> permite recibir un observable y recibir otro observable
 * #3 agregar pipe( switchMap())
 */

/**
 * * NOTAS terminar pantalla ver
 * #1 tap from rxjs/operators: dispara un efecto secundario
 *    tap(console.log) === tap(resp => console.log(resp)) // despues de switch map, imprime automaticamente el resultado del switchMap
 */