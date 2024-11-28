import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Usuario } from '../model/usuario';

export class UsuarioFiltro {
  id!: number;
  email!: string;
  nome!: string;
  pagina : number = 0;
  itensPorPagina: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario>{

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/usuario`, http);
  }

  override pesquisar(filtro: UsuarioFiltro): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if(filtro.id) {
      params = params.set('id', filtro.id.toString());
    }

    if(filtro.email) {
      params = params.set('email', filtro.email);
    }

    if(filtro.email) {
      params = params.set('nome', filtro.nome);
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
    return firstValueFrom(this.http.get<Blob>(`${environment.apiUrl}/usuario/relatorios/geral`, { responseType: 'blob' as 'json' }));
  }

}