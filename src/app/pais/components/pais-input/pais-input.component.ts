import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  termino!: string

  @Input() placeholder!: string

  @Output() onEnter: EventEmitter<string> = new EventEmitter()
  @Output() onDebounce : EventEmitter<string> = new EventEmitter()

  /** @Observable puedo usar operadores de rxjs */
  debouncer: Subject<string> = new Subject()

  constructor() { }

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(valor => {
      this.onDebounce.emit(valor)
    })
  }
  /**
   * @notas_pipe "no emitas el subscribe hasta que este observable (debouncer) deje de emitir valores por los prox 300ms"
   */

  buscar() {
    this.onEnter.emit(this.termino)
  }

  /**
   * @param event: any (deprecated)
   */
  teclaPresionada() {
    // * Forma de capturar el valor cuando se le pasa $event en la vista
    // * const valor = event.target.value

    /** 
     * @next siguiente valor que voy a emitir 
     * la idea es que el debouncer se emita cuando deje de escirbir
    */
    this.debouncer.next(this.termino)
  }
}
