import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Fornecedor, FornecedorContato } from '../../../model/fornecedor';

@Component({
  selector: 'app-fornecedor-form-contato',
  standalone: true,
  imports: [FormsModule, CommonModule, InputTextModule, ButtonModule, TooltipModule, FieldsetModule, BreadcrumbModule, 
    InputTextareaModule, ToastModule, DropdownModule, InputMaskModule, TableModule, DialogModule, InputSwitchModule],
  templateUrl: './fornecedor-form-contato.component.html',
  styleUrl: './fornecedor-form-contato.component.css'
})
export class FornecedorFormContatoComponent {

  @Input() consulta!: boolean;
  @Input() entidade!: Fornecedor;
  @Input() formulario!: boolean;
  @Input() form: any;

  contatoSelecionado = new FornecedorContato();
  habilitarContatoSelecionado: boolean = this.consulta;
  tituloDialog: string = "Incluir Contato"
  visibleDialog: boolean = false;

  public tiposContato = [
    {label: 'E-MAIL', value:'EMAIL'},
    {label: 'TELEFONE', value:'TELEFONE'}
  ]

  public tiposStatus = [
    {label: 'ATIVO', value:'ATIVO'},
    {label: 'INATIVO', value:'INATIVO'}
  ]

  constructor(
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.contatoSelecionado.status = "ATIVO";
    this.contatoSelecionado.tipo = "EMAIL"
    this.contatoSelecionado.principal = false;
  }

  public adicionar(contato: FornecedorContato){     
    if(contato.tipo && contato.valor){
      let encontrou = false;
      for(let i = 0; i < this.entidade.contatos.length; i++) {
        if(this.entidade.contatos[i].tipo === contato.tipo && this.entidade.contatos[i].valor === contato.valor){   
          encontrou = true;
          if(this.habilitarContatoSelecionado){
            this.entidade.contatos[i] = contato;
          }else{
            this.messageService.add({severity:'warn', summary:'Aviso!', detail:'Contato já existe'});
          }
        }
      } 

      if(!encontrou){
        this.entidade.contatos.push(contato);
      }
      this.fecharDialog();
    }else{
      this.messageService.add({severity:'warn', summary:'Aviso!', detail:'Informe os dados necessários'});
    }
  }

  public remover(contato: FornecedorContato){     
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: ${contato.valor}`,
      accept: (() => {              
        let index = 0;
        for(let i = 0; i < this.entidade.contatos.length; i++) {
          if(this.entidade.contatos[i].tipo === contato.tipo && this.entidade.contatos[i].valor === contato.valor){    
            index = this.entidade.contatos.indexOf(this.entidade.contatos[i]);
          }
        }   
        if(index != null){
          if(this.entidade.contatos.length == 1){
            this.entidade.contatos = new Array<FornecedorContato>();
          }else{
            this.entidade.contatos.splice(index, 1);
          }
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Contato excluído da lista'});                       
        }  
        this.redefinirContatoSelecionado();      
      })
    });    
  }

  public selecionarItemTabela(contato: FornecedorContato){
    this.contatoSelecionado = contato;
    this.habilitarContatoSelecionado = true
    this.tituloDialog = "Alterar Contato"
    this.abrirDialog();
  }

  public redefinirContatoSelecionado(){
    this.contatoSelecionado = new FornecedorContato();
    this.habilitarContatoSelecionado = false;
    this.tituloDialog = "Incluir Contato"
  }

  public abrirDialog(){
    this.visibleDialog = true;
  }

  public fecharDialog(){
    this.visibleDialog = false;
    this.redefinirContatoSelecionado();
  }

}