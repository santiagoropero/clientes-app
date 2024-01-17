import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Usuario } from '../usuarios/usuario';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAutheticated: boolean;
  usuario: Usuario

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isAutheticated = this.authService.isAuthenticated();
    this.usuario = this.authService.usuario;
  }

  logout(): void {
    this.authService.logout();
    swal.fire({
      title: 'Cierre de sesión',
      text: 'Se ha cerrado la sesión con exito',
      icon: 'success'
    });
    this.router.navigate(['/login']);
  }

}
