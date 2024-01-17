import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import {formatDate, registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import { Region } from './region';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEnpoint = 'http://localhost:8080/api/clientes';
  constructor(private httpCliente: HttpClient,
              private router: Router) { }


  getClientes(page: number): Observable<any> {
    return this.httpCliente.get<Cliente[]>(this.urlEnpoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
         cliente.nombre = cliente.nombre.toUpperCase();
         cliente.apellido = cliente.apellido.toUpperCase();
         cliente.createAt = formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy', 'es');
         return cliente;
       });
        return response;
      }),
      tap((response: any) => {
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
          console.log(cliente.apellido);
          console.log(cliente.email);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.httpCliente.post(this.urlEnpoint, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.error.mensaje) {
          console.log('Error', e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getCLiente(idCliente: number): Observable<Cliente> {
    return this.httpCliente.get<Cliente>(`${this.urlEnpoint}/${idCliente}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.log('Error', e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.httpCliente.put(`${this.urlEnpoint}/${cliente.id}`, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.error.mensaje) {
          console.log('Error', e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(idCLiente: number): Observable<Cliente> {
    return this.httpCliente.delete<Cliente>(`${this.urlEnpoint}/${idCLiente}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log('Error', e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  uploadFoto(archivo: File, id): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    const request = new HttpRequest('POST', `${this.urlEnpoint}/upload`, formData, {
      reportProgress: true
    });
    return this.httpCliente.request(request);
      // map((response: any) => response.cliente as Cliente,
      //   catchError(e => {
      //     swal.fire({
      //       title: 'Error al subir la foto del cliente',
      //       text: e.error.mensaje,
      //       icon: 'error'
      //     });
      //     return throwError(e);
      //   })
      // ));
  }


  getRegiones(): Observable<Region[]> {
    return this.httpCliente.get<Region[]>(`${this.urlEnpoint}/regiones`);
  }

}
