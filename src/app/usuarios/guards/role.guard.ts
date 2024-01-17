import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }

      let role = next.data['role'] as string;
      console.log('ROLE ', role);

      if (this.authService.hasRole(role)) {
        return true;
      }
      swal.fire({
        title: 'Acceso denegado',
        text: 'No puede acceder a este recurso',
        icon: 'warning'
      });
      this.router.navigate(['/clientes']);
      return false;

  }

}
