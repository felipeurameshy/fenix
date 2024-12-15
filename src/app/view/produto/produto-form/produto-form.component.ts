import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuFormComponent } from '../../../components/menu-form/menu-form.component';
import { LoadingService } from '../../../configuration/core/loading.service';
import { SecaoService } from '../../../service/secao.service';
import { Secao } from '../../../model/secao';
import { SelectFornecedorComponent } from '../../../components/select-fornecedor/select-fornecedor.component';
import { SelectSecaoComponent } from '../../../components/select-secao/select-secao.component';
import { environment } from '../../../../environments/environment';
import { Fornecedor } from '../../../model/fornecedor';
import { Produto, ProdutoVO } from '../../../model/produto';
import { ProdutoService } from '../../../service/produto.service';
import { SelectProdutoPaiComponent } from '../../../components/select-produto-pai/select-produto-pai.component';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuFormComponent, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, InputNumberModule, InputGroupModule, InputGroupAddonModule, FileUploadModule, 
    InputTextareaModule, DropdownModule, SelectSecaoComponent, SelectFornecedorComponent, SelectProdutoPaiComponent, CardModule, CalendarModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent extends BaseResourceFormComponent<Produto> {

  imagemCarregada!: string;

  public tiposStatus = [
    {label: 'ATIVO', value:'ATIVO'},
    {label: 'INATIVO', value:'INATIVO'}
  ]

  public tiposProduto = [
    {label: 'CONSIGNADO', value:'CONSIGNADO'},
    {label: 'NORMAL', value:'NORMAL'}
  ]  

  constructor(
    public entidadeService: ProdutoService,
    public secaoService: SecaoService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler : ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/produto/listar",
      "Produto",
      [{label:'Fênix'},{label: 'Cadastro'},{label: 'Produto'}],
      route,
      router,
      messageService,
      title,
      errorHandler,
      loadingService,
      confirmation
    );
  }

  override configurarFormulario(): void {
    this.entidade.status = "ATIVO";
    this.entidade.tipo = "NORMAL";
    this.entidade.secao = new Secao();
    this.entidade.fornecedor = new Fornecedor();
    this.entidade.produtoPai = new ProdutoVO();
    this.entidade.valorCusto = 0;
    this.entidade.valorVenda = 0;
    this.entidade.valorDesconto = 0;
    this.entidade.valorVendaLiquido = 0;
    this.entidade.margem = 0;
  }

  override inicializarObjetosNulosBuscar(entidade: Produto): void {
    if(!entidade.secao){
      this.entidade.secao = new Secao();
    }
    if(!entidade.fornecedor){
      this.entidade.fornecedor = new Fornecedor();
    }
    if(!entidade.produtoPai){
      this.entidade.produtoPai = new ProdutoVO();
    }
  }

  override buscar(id: number) {
    this.loadingService.show();
    this.resourceService.buscar(id)
      .then( dados => {
        this.entidade = dados;      
        this.inicializarObjetosNulosBuscar(this.entidade);
        this.carregarImagem();
        if(this.consulta){
          this.title.setTitle (`Fênix - Consulta ${this.nomeTitle}`);
        }else{
          this.title.setTitle (`Fênix - Alteração ${this.nomeTitle}`);
        }
        this.loadingService.hide();
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.loadingService.hide();
      });
  }
  
  selecionarSecao(secao: Secao){
    this.entidade.secao = secao;    
  }

  selecionarFornecedor(fornecedor: Fornecedor){
    this.entidade.fornecedor = fornecedor;    
  }

  selecionarProdutoPai(produtoPai: ProdutoVO){
    this.entidade.produtoPai = produtoPai;    
  }

  get urlUploadArquivo() {
    return this.entidadeService.salvarImagem();
  }

  adicionarImagem(event: any){        
    this.entidade.imagem = event.originalEvent.body.nome;    
    this.carregarImagem() ;
  }

  carregarImagem(){
    if(this.entidade.imagem){      
      console.log(this.entidade.imagem)      
      return `${environment.apiUrl}/produto/buscar-imagem/${this.entidade.imagem}`
    }
    return null;   
  }

  calcularMargem(proximo: string) {       
    let venda = this.entidade.valorVenda;
    let custo = this.entidade.valorCusto;
    let desconto = this.entidade.valorDesconto;
    let vendaLiquido = this.entidade.valorVendaLiquido;
    let margem = 0;    

    if(this.entidade.valorVenda == 0 ){
      margem = 0;
      this.entidade.margem = 0;
      this.entidade.valorVendaLiquido = custo;
    }else{
      if(proximo == null){
        margem = ((vendaLiquido - custo) / custo ) * 100;
        this.entidade.margem = margem;        
      }else{
        margem = (((venda - desconto) - custo) / custo ) * 100;
        this.entidade.margem = margem;
        this.entidade.valorVendaLiquido = (venda - desconto);
      }
    }    

  }

  calcularMargemValorLiquido() {
    let venda = this.entidade.valorVenda;
    let custo = this.entidade.valorCusto;
    let desconto = this.entidade.valorDesconto;
    let vendaLiquido = this.entidade.valorVendaLiquido;
    let margem = 0;    

    margem = ((vendaLiquido - custo) / custo ) * 100;
    this.entidade.margem = margem;

    if(vendaLiquido < venda)
    this.entidade.valorDesconto = venda - vendaLiquido;
  }

}