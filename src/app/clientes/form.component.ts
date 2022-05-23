import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear cliente';
  constructor(private clienteService: ClienteService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  // tslint:disable-next-line:typedef
  cargarClientes() {
    this.activeRoute.params.subscribe(params => {
      const idCliente = params.idCliente;
      if (idCliente) {
        this.clienteService.getCLiente(idCliente).subscribe(cliente => this.cliente = cliente);
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire(
          'Cliente Creado',
          `Se ha creado el cliente ${cliente.nombre + ' ' + cliente.apellido} satisfactoriamente`,
          'success'
        );
      }
    );
  }

  update(): void {
      this.clienteService.update(this.cliente).subscribe(
        cliente => {
          this.router.navigate(['/clientes']);
          swal.fire(
            'Cliente Actualizado',
            `Se ha actualizado el cliente ${cliente.nombre + ' ' + cliente.apellido} satisfactoriamente`,
            'success'
          );
        }
      );
  }
}
