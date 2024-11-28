import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private http: HttpClient,
  ) {}

  public validarTipoServidor() {
    return firstValueFrom(this.http.get<any>(`${environment.apiUrl}/system/validar-tipo-servidor`));
  }

  public versaoApi() {
    return firstValueFrom(this.http.get<any>(`${environment.apiUrl}/system/versao-api`));
  }
  
}