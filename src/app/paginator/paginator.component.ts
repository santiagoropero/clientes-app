import {Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginador: any;
  totalPaginas: number[];
  desde: number;
  hasta: number;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initPaginador();
    const paginadorActualizado = changes.paginador;
    if (paginadorActualizado.previousValue) {
      this.initPaginador();
    }
    console.log('Paginador', this.paginador);
  }

  private initPaginador(): void {
    if (this.paginador) {
      this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
      this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);
      if (this.paginador.totalPages > 5) {
        this.totalPaginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde );
      } else {
        this.totalPaginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1 );
      }
    }
  }

}
