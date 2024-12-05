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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuFormComponent } from '../../../components/menu-form/menu-form.component';
import { UpperCaseDirective } from '../../../configuration/shared/upper-case.directive';
import { LoadingService } from '../../../configuration/core/loading.service';
import { FornecedorFormEnderecoComponent } from '../fornecedor-form-endereco/fornecedor-form-endereco.component';
import { FornecedorFormContatoComponent } from '../fornecedor-form-contato/fornecedor-form-contato.component';
import { Fornecedor, FornecedorContato, FornecedorEndereco } from '../../../model/fornecedor';
import { FornecedorService } from '../../../service/fornecedor.service';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuFormComponent, UpperCaseDirective, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, InputTextareaModule, ToastModule, DropdownModule, CheckboxModule, RadioButtonModule,
    InputMaskModule, InputSwitchModule, CalendarModule, TabViewModule, FornecedorFormEnderecoComponent, 
    FornecedorFormContatoComponent],
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.css'
})
export class FornecedorFormComponent extends BaseResourceFormComponent<Fornecedor> {

  public tiposStatus = [
    {label: 'ATIVO', value:'ATIVO'},
    {label: 'INATIVO', value:'INATIVO'}
  ]

  cnpjCpfSelecionado: string = 'CNPJ';

  constructor(
    private entidadeService: FornecedorService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler: ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/fornecedor/listar",
      "Fornecedor",
      [{ label: 'Fênix' }, { label: 'Cadastro' }, { label: 'Fornecedor' }],
      route,
      router,
      messageService,
      title,
      errorHandler,
      loadingService,
      confirmation
    );
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

  override configurarFormulario(): void {
    this.entidade.enderecos = new Array<FornecedorEndereco>();
    this.entidade.contatos = new Array<FornecedorContato>();
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