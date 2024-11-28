import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Perfil } from '../model/perfil';

export class PerfilFiltro {
  id!: number;
  descricao!: string;
  pagina : number = 0;
  itensPorPagina: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends BaseResourceService<Perfil>{

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/perfil`, http);
  }

  override pesquisar(filtro: PerfilFiltro): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if(filtro.id) {
      params = params.set('id', filtro.id.toString());
    }

    if(filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
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

  relatorioGeral() { 
    return firstValueFrom(this.http.get<Blob>(`${environment.apiUrl}/perfil/relatorios/geral`, { responseType: 'blob' as 'json' }));
  }

}