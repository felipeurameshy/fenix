import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CommonModule, CurrencyPipe } from '@angular/common';

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
import { TableModule } from 'primeng/table';
import { Despesa, DespesaItem } from '../../../model/despesa';
import { DespesaService } from '../../../service/despesa.service';
import { Categoria } from '../../../model/categoria';
import { SelectCategoriaComponent } from '../../../components/select-categoria/select-categoria.component';

@Component({
  selector: 'app-despesa-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuFormComponent, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, InputNumberModule, InputGroupModule, InputGroupAddonModule, FileUploadModule, 
    InputTextareaModule, DropdownModule, SelectCategoriaComponent, CardModule, TableModule, CalendarModule, CurrencyPipe],
  templateUrl: './despesa-form.component.html',
  styleUrl: './despesa-form.component.css'
})
export class DespesaFormComponent extends BaseResourceFormComponent<Despesa> {

  despesaItemSelecionado!: DespesaItem
 
  constructor(
    public entidadeService: DespesaService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler : ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/despesa/listar",
      "Despesa",
      [{label:'Fênix'},{label: 'Financeiro'},{label: 'Despesa'}],
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
    this.entidade.dataDespesa = new Date();    
    this.entidade.categoria = new Categoria();
    this.entidade.valorTotal = 0;
    this.entidade.itens = new Array<DespesaItem>();
    this.despesaItemSelecionado = new DespesaItem();
  }

  selecionarCategoria(categoria: Categoria){
    this.entidade.categoria = categoria;
  }

  adicionarItem(despesaItem: DespesaItem){

    if(despesaItem.quantidade <= 0 || despesaItem.quantidade == null || despesaItem.valorUnitario <= 0 || despesaItem.valorUnitario == null
      || despesaItem.valorTotal <= 0 || despesaItem.valorTotal == null){
      return this.messageService.add({severity:'warn', summary:'Aviso!', detail:'Informe os dados necessários'});
    }

    this.entidade.itens.push(despesaItem);

    this.limparCamposItem();
    this.calcularValorTotalItems();
  }

  removerItem(despesaItem: DespesaItem){     
    this.confirmation.confirm({
      message: `Tem certeza que deseja remover o item`,
      accept: (() => {              
        let index = 0;
        for(let i = 0; i < this.entidade.itens.length; i++) {
          if(this.entidade.itens[i].descricao === despesaItem.descricao){    
            index = this.entidade.itens.indexOf(this.entidade.itens[i]);
          }
        }   
        if(index != null){   
          if(this.entidade.itens.length == 1){
            this.entidade.itens = new Array<DespesaItem>();
          }else{
            this.entidade.itens.splice(index, 1);
          }
          this.messageService.add({severity:'success', key:'msg', summary:'Sucesso', detail:'Item excluído'});                       
        }     
        
        this.limparCamposItem();
        this.calcularValorTotalItems();   
      })
    });    
  }

  limparCamposItem(){
    this.despesaItemSelecionado = new DespesaItem();
  }

  calcularValorTotalItem(despesaItem: DespesaItem){
    
    if(despesaItem.quantidade <= 0 || despesaItem.quantidade == null || despesaItem.valorUnitario <= 0 || despesaItem.valorUnitario == null){
      return this.messageService.add({severity:'warn', summary:'Aviso!', detail:'Informe a quantidade e o valor unitário'});
    }else{
      despesaItem.valorTotal = despesaItem.valorUnitario * despesaItem.quantidade;  
    }

  }

  calcularValorTotalItems(){
    let valorTotal = 0;

    if(this.entidade.itens.length != 0){      
      for(let i = 0; i < this.entidade.itens.length; i++) {
        valorTotal = valorTotal + this.entidade.itens[i].valorTotal;      
      }
    }
    this.entidade.valorTotal = valorTotal;
  }

}