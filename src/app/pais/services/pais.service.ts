import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
// import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private _http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${termino}`
    return this._http.get<Country[]>(url)
                      // .pipe(
                      //   catchError(err => of(['Hello motherFucker ']))
                      // )
                      /** 
                       * @pipe_rxjs
                       * - es un operador de rxjs
                       * - regresa un observable
                       * - @of es una fx q genera observables q transforma lo q esté en sus parentésis en un observable
                       * - este manejo de error no dispara el error en el componente porq el error se atrapa aquí
                       * */
  }

  buscarXCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`
    return this._http.get<Country[]>(url)
  }
  
  /** @nota es mejor trabajar con HttpCommon que funciona bien con rxjs por sobre fetch */
}
