import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import moment from 'moment';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Despesa } from '../model/despesa';

export class DespesaFiltro {
  id!: number;
  descricao!: string;
  pagina : number = 0;
  itensPorPagina: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class DespesaService extends BaseResourceService<Despesa>{

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/despesa`, http);
  }

  override pesquisar(filtro: DespesaFiltro): Promise<any> {
    
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

  override buscar(id: number): Promise<Despesa> {
    return firstValueFrom(this.http.get<Despesa>(`${this.apiPath}/${id}`))
      .then((response:any) => {        
        this.converterStringsParaDatas([response]);
        return response;
      });
  }

  private converterStringsParaDatas(lista: Despesa[]) {

    for (const entidade of lista) {

      if(entidade.dataDespesa){
        entidade.dataDespesa = moment(entidade.dataDespesa, 'YYYY-MM-DD').toDate();
      }

    }
  }

}