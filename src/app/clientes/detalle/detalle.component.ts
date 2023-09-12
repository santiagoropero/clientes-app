import { Component, Input, OnInit } from '@angular/core';
import { Cliente} from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo = 'Detalle del cliente';
  fotoSeleccionada: File;
  progress = 0;
  constructor(private clienteService: ClienteService,
              public modalService: ModalService) {
  }

  ngOnInit(): void {
    // Obtener el id por la ruta
    // this.activeRoute.paramMap.subscribe(
    //   params => {
    //     const id = + params.get('idCliente');
    //     if (id) {
    //       this.clienteService.getCLiente(id).subscribe(cliente => this.cliente = cliente);
    //     }
    //   }
    // );
  }

  // tslint:disable-next-line:typedef
  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progress = 0;
    console.log('FOTO', this.fotoSeleccionada);
    console.log('INDEX OF', this.fotoSeleccionada.type.indexOf('image'));
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire(
        'Error',
        'El archivo debe ser de tipo imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    }
  }

  // tslint:disable-next-line:typedef
  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire(
        'Error',
        'Se debe seleccionar una foto',
        'error'
      );
    } else {
      this.clienteService.uploadFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event => {
        // this.cliente = cliente;
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / (event.total ?? 0));
          } else if (event.type === HttpEventType.Response) {
            const response = event.body;
            this.cliente = response.cliente as Cliente;
            swal.fire(
              'Subida de imagen',
              `${response.mensaje}`,
              'success'
            );
          }
      });
    }}


  closeModal(): void {
    this.modalService.closeModal();
    this.fotoSeleccionada = null;
    this.progress = 0;
  }
}
