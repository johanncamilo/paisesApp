import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private _http: HttpClient) { }

  buscarPais(termino: string): Observable<any> {

    const url = `${this.apiUrl}/name/${termino}`
    return this._http.get(url)
  }

  /** @nota es mejor trabajar con HttpCommon que funciona bien con rxjs por sobre fetch */
}
