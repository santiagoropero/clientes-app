import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo = 'Por favor Sign In!';
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      swal.fire({
        title: 'Error login',
        text: `Hola ${this.authService.usuario.nombre} Ya estas autenticado`,
        icon: 'info'
      });
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null) {
      swal.fire({
        title: 'Error login',
        text: 'Usurname o password están vacios',
        icon: 'error'
      });
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      this.authService.guardarToken(response.access_token);
      this.authService.guardarUsuario(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      swal.fire({
        title: 'Login',
        text: `Bienvenido ${usuario.nombre}`,
        icon: 'success'
      });
    }, error => {
      if(error.status == 400) {
        swal.fire({
          title: 'Error Login',
          text: 'Credenciales inválidas',
          icon: 'error'
        });
      }
    })
  }

}
