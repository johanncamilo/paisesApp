import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';
// import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl_v3: string = 'https://restcountries.com/v3.1'
  private apiUrl_v2: string = 'https://restcountries.com/v2'

  get httpParams () {
    return new HttpParams().set('fields', 'name,capital,cca2,flags,population')
  }

  constructor(private _http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {

    const url = `${this.apiUrl_v3}/name/${termino}`
    return this._http.get<Country[]>(url, { params: this.httpParams })
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
    const url = `${this.apiUrl_v3}/capital/${termino}`
    return this._http.get<Country[]>(url, { params: this.httpParams })
  }

  paisXAlpha(id: string): Observable<Country> {
    const url = `${this.apiUrl_v3}/alpha/${id}`
    return this._http.get<Country>(url, { params: this.httpParams })
  }

  buscarRegion(region: string): Observable<Country[]>{

    const params = new HttpParams().set('fields', 'name,capital,alpha2Code,flag,population')

    // * request filtrando parametros (OLD-WAY)
    // const url = `${this.apiUrl_v2}/regionalbloc/${region}?fields=name,capital,alpha2Code,flag,population`

    const url = `${this.apiUrl_v2}/regionalbloc/${region}`
    return this._http.get<Country[]>(url, { params })
              .pipe( tap(console.log) )
  }
  
  /** 
   * @nota es mejor trabajar con HttpClient de common que funciona bien con rxjs por sobre fetch 
   * @HttpParams de @angular_common sirve para configurar los prametros del request tal como se hace en postman/thunder
  */
}
