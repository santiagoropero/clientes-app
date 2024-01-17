import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario
  private _token: string;

  private urlEnpoint = 'http://localhost:8080/oauth/token';
  private credenciales = btoa('angularapp' + ':' + '12345');
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization' : 'Basic ' + this.credenciales
  });

  private params = new URLSearchParams();



  constructor(private httpClient: HttpClient) { }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    } else {
      return null;
    }
  }
  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    } else {
      return new Usuario();
    }
  }

  login(usuario: Usuario): Observable<any> {
    this.params.set('grant_type', 'password');
    this.params.set('username', usuario.username);
    this.params.set('password', usuario.password);
    console.log(this.params.toString());
    return this.httpClient.post<any>(this.urlEnpoint, this.params.toString(), {headers: this.httpHeaders});
  }


  guardarToken(token: string): void {
    this._token = token;
    sessionStorage.setItem('token',token);
  }

  guardarUsuario(token: string): void {
    let payload = this.decodeToken(token);
    console.log("Token ", payload);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario))
  }

  decodeToken(token: string): any {
    if (token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    let payload = this.decodeToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }
}
