import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import moment from 'moment';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Produto, ProdutoVO } from '../model/produto';

export class ProdutoFiltro {
  id!: number;
  descricao!: string;
  pagina : number = 0;
  itensPorPagina: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseResourceService<Produto>{

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/produto`, http);
  }

  override pesquisar(filtro: ProdutoFiltro): Promise<any> {
    
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

  override buscar(id: number): Promise<Produto> {
    return firstValueFrom(this.http.get<Produto>(`${this.apiPath}/${id}`))
      .then((response:any) => {        
        this.converterStringsParaDatas([response]);
        return response;
      });
  }


  salvarImagem(): string {
    return `${this.apiPath}/salvar-imagem`;
  }

  listarProdutosVO(): Promise<any> {
    return firstValueFrom(
      this.http.get<ProdutoVO[]>(`${this.apiPath}/listar-produtos-vo`)
    );
  }

  private converterStringsParaDatas(lista: Produto[]) {

    for (const entidade of lista) {

      if(entidade.dataDesativacao){
        entidade.dataDesativacao = moment(entidade.dataDesativacao, 'YYYY-MM-DD').toDate();
      }


    }
  }

}