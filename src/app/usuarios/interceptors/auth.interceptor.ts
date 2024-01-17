import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService) {}

  intercept(request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(error => {

        if(error.status == 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }

        if(error.status == 403) {
          swal.fire({
            title: 'Acceso denegado',
            text: 'No puede para acceder a este recurso',
            icon: 'warning'
          });
          this.router.navigate(['/clientes']);
        }
        return throwError(error);
      })
    );
  }
}
