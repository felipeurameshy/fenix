import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    this.carregarToken();
  }

  public login(email: string, senha: string): Promise<void> {
    let body = {
      'email':email,
      'senha':senha
    }
    return firstValueFrom(this.http.post<any>(`${environment.apiUrl}/autenticacao/login`, body))
    .then(response => {
      this.armazenarToken(response.token);
    })
    .catch(response => {
      return Promise.reject(response);
    });
  }

  public logout() {
    this.limparAccessToken();
  }

  public isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  public temPermissao(permissao: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('id', this.jwtPayload.id);
    localStorage.setItem('nome', this.jwtPayload.nome);
    localStorage.setItem('status', this.jwtPayload.status);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  public limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

}
