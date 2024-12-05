import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Fornecedor } from '../model/fornecedor';

export class FornecedorFiltro {
  id!: number;
  cnpjCpf!: string;
  nomeFantasia!: string;
  razaoSocial!: string;
  pagina : number = 0;
  itensPorPagina: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends BaseResourceService<Fornecedor>{

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/fornecedor`, http);
  }

  override pesquisar(filtro: FornecedorFiltro): Promise<any> {
    
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if(filtro.id) {
      params = params.set('id', filtro.id.toString());
    }

    if(filtro.cnpjCpf) {
      params = params.set('cnpjCpf', filtro.cnpjCpf);
    }

    if(filtro.nomeFantasia) {
      params = params.set('nomeFantasia', filtro.nomeFantasia);
    }

    if(filtro.razaoSocial) {
      params = params.set('razaoSocial', filtro.razaoSocial);
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

  pesquisarPorCnpjCpf (cnpjCpf: string): Promise<any> {
    return firstValueFrom(this.http.get<Fornecedor>(`${this.apiPath}/pesquisar-por-cnpj-cpf/${cnpjCpf}`));
  }

}