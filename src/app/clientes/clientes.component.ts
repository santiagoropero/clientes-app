import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listaClientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page = Number(params.get('page'));
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap(response =>  {
          this.listaClientes = response.content as Cliente[];
          this.paginador = response;
        })
      ).subscribe();
    });
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: `¿Está seguro de eliminar el cliente ${cliente.nombre + ' ' + cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.listaClientes = this.listaClientes.filter(cli => cli !== cliente);
            Swal.fire(
              `Cliente Eliminado`,
              `El cliente ${cliente.nombre + ' ' + cliente.apellido} ha sido eliminado correctamente`,
              'success'
            );
          }
        );
      }
    });
  }

  openModal(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.modalService.openModal();
  }

}
