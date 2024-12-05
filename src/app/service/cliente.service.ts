import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Cliente } from '../model/cliente';

export class ClienteFiltro {
  id!: number;
  nome!: string;
  email!: string;
  telefone!: string;
  pagina : number = 0;
  itensPorPagina: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseResourceService<Cliente>{

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/cliente`, http);
  }

  override pesquisar(filtro: ClienteFiltro): Promise<any> {
    
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if(filtro.id) {
      params = params.set('id', filtro.id.toString());
    }

    if(filtro.nome) {
      params = params.set('descricao', filtro.nome);
    }

    if(filtro.email) {
      params = params.set('email', filtro.email);
    }

    if(filtro.telefone) {
      params = params.set('telefone', filtro.telefone);
    }
  
    return firstValueFrom(this.http.get(`${this.apiPath}/pesquisar`, { params }))
      .then((response: any) => {
        const resultado = {
          selecionados: response['content'],
          total: response['totalElements']
        }
        return resultado;
      });
  }

  buscarPorTelefone(telefone: String): Promise<Cliente> {
    return firstValueFrom(this.http.get<Cliente>(`${this.apiPath}/buscar-por-telefone/${telefone}`))
      .then((response:any) => {
        return response;
      });
  }

}