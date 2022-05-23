import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {
  
  listaCursos: string[] = ['TypeScript','JavaScript','Java EE','C#','PHP']
  habilitar: boolean = true;
  constructor() { }


  ocultarLista(){
    this.habilitar = false
  }

  mostrarLista(){
    this.habilitar = true
  }
}
