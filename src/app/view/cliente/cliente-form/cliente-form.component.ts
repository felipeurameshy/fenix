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

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuFormComponent } from '../../../components/menu-form/menu-form.component';
import { UpperCaseDirective } from '../../../configuration/shared/upper-case.directive';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Cliente, ClienteEndereco } from '../../../model/cliente';
import { ClienteService } from '../../../service/cliente.service';
import { ClienteFormEnderecoComponent } from '../cliente-form-endereco/cliente-form-endereco.component';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuFormComponent, UpperCaseDirective, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, TabViewModule, ClienteFormEnderecoComponent, InputMaskModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent extends BaseResourceFormComponent<Cliente> {

  constructor(
    entidadeService: ClienteService,
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
  
  override salvar(form: FormControl): void {
    if(!this.entidade.telefone){
      this.setFormularioInvalido();
    }else{
      super.salvar(form);
    }
  }
}