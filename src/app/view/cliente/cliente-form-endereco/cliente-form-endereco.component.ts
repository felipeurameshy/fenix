import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

import { Cliente, ClienteEndereco } from '../../../model/cliente';
import { UpperCaseDirective } from '../../../configuration/shared/upper-case.directive';

@Component({
  selector: 'app-cliente-form-endereco',
  standalone: true,
  imports: [FormsModule, CommonModule, UpperCaseDirective, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, ToastModule, InputMaskModule, DropdownModule, DialogModule, CardModule],
  templateUrl: './cliente-form-endereco.component.html',
  styleUrl: './cliente-form-endereco.component.css'
})
export class ClienteFormEnderecoComponent implements OnInit {

  @Input() consulta!: boolean;
  @Input() entidade!: Cliente;
  @Input() formulario!: boolean;
  @Input() form: any;

  enderecoSelecionado = new ClienteEndereco();
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

  public adicionar(endereco: ClienteEndereco){   
    if(endereco.cep && endereco.estado && endereco.cidade && endereco.bairro && 
      endereco.endereco && endereco.numero){
      let encontrou = false;
      for(let i = 0; i < this.entidade.enderecos.length; i++) {
        if(this.entidade.enderecos[i].cep === endereco.cep){   
          encontrou = true;
          if(this.habilitarSelecionado){
            this.entidade.enderecos[i] = endereco;
          }else{
            this.messageService.add({severity:'warn', summary:'Aviso!', detail:'Endereço já existe'});
          }
        }
      } 

      if(!encontrou){
        this.entidade.enderecos.push(endereco);
      }
      this.fecharDialog();
    }else{
      this.messageService.add({severity:'warn', summary:'Aviso!', detail:'Informe os dados necessários'});
    }
  }

  public remover(endereco: ClienteEndereco){     
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
            this.entidade.enderecos = new Array<ClienteEndereco>();
          }else{
            this.entidade.enderecos.splice(index, 1);
          }
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Endereço excluído da lista'});                       
        }  
        this.redefinirSelecionado();      
      })
    });    
  }

  public selecionar(endereco: ClienteEndereco){
    this.enderecoSelecionado = endereco;
    this.habilitarSelecionado = true
    this.tituloDialog = "Alterar Endereço"
    this.abrirDialog();
  }

  public redefinirSelecionado(){
    this.enderecoSelecionado = new ClienteEndereco();
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