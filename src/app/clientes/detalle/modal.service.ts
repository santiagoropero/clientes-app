import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal = false;
  constructor() { }

  openModal(): void {
    this.modal = true;
  }

  closeModal(): void {
    this.modal = false;
  }
}
