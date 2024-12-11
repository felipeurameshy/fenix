import { Component } from '@angular/core';
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
import { TabViewModule } from 'primeng/tabview';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuFormComponent } from '../../../components/menu-form/menu-form.component';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Cliente, ClienteEndereco } from '../../../model/cliente';
import { ClienteService } from '../../../service/cliente.service';
import { ClienteFormEnderecoComponent } from '../cliente-form-endereco/cliente-form-endereco.component';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuFormComponent, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, TabViewModule, ClienteFormEnderecoComponent, InputMaskModule, RadioButtonModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent extends BaseResourceFormComponent<Cliente> {

  cnpjCpfSelecionado: string = 'CNPJ';

  constructor(
    private entidadeService: ClienteService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler : ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/cliente/listar",
      "Cliente",
      [{label:'Fênix'},{label: 'Cadastro'},{label: 'Cliente'}],
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
    this.entidade.enderecos = new Array<ClienteEndereco>();
  }

  override buscar(id: number): void {
    this.loadingService.show();
    this.resourceService.buscar(id)
      .then( dados => {
        this.entidade = dados;
        this.inicializarObjetosNulosBuscar(this.entidade);
        
        if(dados.cnpjCpf){
          if(dados.cnpjCpf.length < 14){
            this.cnpjCpfSelecionado = 'CPF';
          }
        }
        
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
  
  override verificarFormularioValido(form: FormControl): boolean {
    if(!this.entidade.cnpjCpf){
      this.setFormularioInvalido();
      return false;
    }else if(form.invalid){
      this.setFormularioInvalido();
      return false;
    }else{
      this.formularioInvalido = false
      return true;
    }  
}

  verificarCnpjCpfCadastrado(){
    if(this.entidade.cnpjCpf != null && this.entidade.cnpjCpf != ""){
        if(!this.entidade.cnpjCpf){
          return;
        }

        if(this.cnpjCpfSelecionado == "CPF"){
          this.entidade.cnpjCpf = this.entidade.cnpjCpf.substring(0,11);
        }

        this.loadingService.show();
        this.entidadeService.pesquisarPorCnpjCpf(this.entidade.cnpjCpf)
          .then( dados => {
            if(dados != null){              
              if(!this.entidade.id){
                if(this.entidade.cnpjCpf == dados.cnpjCpf){
                  this.entidade.cnpjCpf = "";
                  this.messageService.add({severity:'error', summary:'Erro', detail: this.cnpjCpfSelecionado+' '+dados.cnpjCpf+' já cadastrado para outro Fornecedor' });
                }
              }else if(this.entidade.id != dados.id){
                this.entidade.cnpjCpf = "";
                this.messageService.add({severity:'error', summary:'Erro', detail: this.cnpjCpfSelecionado+' '+dados.cnpjCpf+' já cadastrado para outro Fornecedor' });
              }
            }
            this.loadingService.hide();
          })
          .catch(erro => {
            this.entidade.cnpjCpf = "";
            this.errorHandler.handle(erro);
            this.loadingService.hide();
          });
    }
  }

}