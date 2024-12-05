import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';

import { Fornecedor, FornecedorEndereco } from '../../../model/fornecedor';

@Component({
  selector: 'app-fornecedor-form-endereco',
  standalone: true,
  imports: [FormsModule, CommonModule, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, ToastModule, InputMaskModule, DropdownModule, DialogModule, CardModule],
  templateUrl: './fornecedor-form-endereco.component.html',
  styleUrl: './fornecedor-form-endereco.component.css'
})
export class FornecedorFormEnderecoComponent {
  
  @Input() consulta!: boolean;
  @Input() entidade!: Fornecedor;
  @Input() formulario!: boolean;
  @Input() form: any;

  enderecoSelecionado = new FornecedorEndereco();
  habilitarSelecionado: boolean = this.consulta;
  tituloDialog: string = "Incluir Endereço"
  visibleDialog: boolean = false;

  ufs = [
    {label: 'Acre', value: 'AC'},
    {label: 'Alagoas', value: 'AL'},
    {label: 'Amapá', value: 'AP'},
    {label: 'Amazonas', value: 'AM'},
    {label: 'Bahia', value: 'BA'},
    {label: 'Ceará', value: 'CE'},
    {label: 'Distrito Federal', value: 'DF'},
    {label: 'Espírito Santo', value: 'ES'},
    {label: 'Goiás', value: 'GO'},
    {label: 'Maranhão', value: 'MA'},
    {label: 'Mato Grosso', value: 'MT'},
    {label: 'Mato Grosso do Sul', value: 'MS'},
    {label: 'Minas Gerais', value: 'MG'},
    {label: 'Pará', value: 'PA'},
    {label: 'Paraíba', value: 'PB'},
    {label: 'Paraná', value: 'PR'},
    {label: 'Pernambuco', value: 'PE'},
    {label: 'Piauí', value: 'PI'},
    {label: 'Rio de Janeiro', value: 'RJ'},
    {label: 'Rio Grande do Norte', value: 'RN'},
    {label: 'Rio Grande do Sul', value: 'RS'},
    {label: 'Rondônia', value: 'RO'},
    {label: 'Roraima', value: 'RR'},
    {label: 'Santa Catarina', value: 'SC'},
    {label: 'São Paulo', value: 'SP'},
    {label: 'Sergipe', value: 'SE'},
    {label: 'Tocantins', value: 'TO'},
  ];

  constructor(
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ) { }
  
  ngOnInit(): void {
  }

  public adicionar(endereco: FornecedorEndereco){   
    if(endereco.cep){
      let encontrou = false;
      for(let i = 0; i < this.entidade.enderecos.length; i++) {
        if(this.entidade.enderecos[i].cep === endereco.cep){   
          encontrou = true;
          if(this.habilitarSelecionado){
            this.entidade.enderecos[i] = endereco;
          }else{
            this.messageService.add({severity:'warn', key:'msg', sticky: true, summary:'Aviso!', detail:'Endereço já existe'});
          }
        }
      } 

      if(!encontrou){
        this.entidade.enderecos.push(endereco);
      }
      this.fecharDialog();
    }else{
      this.messageService.add({severity:'warn', key:'msg', sticky: true, summary:'Aviso!', detail:'Informe os dados necessários'});
    }
  }

  public remover(endereco: FornecedorEndereco){     
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: ${endereco.cep}`,
      accept: (() => {              
        let index = 0;
        for(let i = 0; i < this.entidade.enderecos.length; i++) {
          if(this.entidade.enderecos[i].cep === endereco.cep){    
            index = this.entidade.enderecos.indexOf(this.entidade.enderecos[i]);
          }
        }   
        if(index != null){   
          if(this.entidade.enderecos.length == 1){
            this.entidade.enderecos = new Array<FornecedorEndereco>();
          }else{
            this.entidade.enderecos.splice(index, 1);
          }
          this.messageService.add({severity:'success', key:'msg', summary:'Sucesso', detail:'Endereço excluído da lista'});                       
        }  
        this.redefinirSelecionado();      
      })
    });    
  }

  public selecionar(endereco: FornecedorEndereco){
    this.enderecoSelecionado = endereco;
    this.habilitarSelecionado = true
    this.tituloDialog = "Alterar Endereço"
    this.abrirDialog();
  }

  public redefinirSelecionado(){
    this.enderecoSelecionado = new FornecedorEndereco();
    this.habilitarSelecionado = false;
    this.tituloDialog = "Incluir Endereço"
  }

  public abrirDialog(){
    this.visibleDialog = true;
  }

  public fecharDialog(){
    this.visibleDialog = false;
  }

}