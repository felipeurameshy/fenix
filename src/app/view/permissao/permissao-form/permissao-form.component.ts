import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { Permissao } from '../../../model/permissao';
import { PermissaoService } from '../../../service/permissao.service';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuFormComponent } from '../../../components/menu-form/menu-form.component';
import { UpperCaseDirective } from '../../../configuration/shared/upper-case.directive';
import { LoadingService } from '../../../configuration/core/loading.service';

@Component({
  selector: 'app-permissao-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuFormComponent, UpperCaseDirective, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule],
  templateUrl: './permissao-form.component.html',
  styleUrl: './permissao-form.component.css'
})
export class PermissaoFormComponent extends BaseResourceFormComponent<Permissao> {

  constructor(
    entidadeService: PermissaoService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler : ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/permissao/listar",
      "Permissão",
      [{label:'Fênix'},{label: 'Segurança'},{label: 'Permissões'}],
      route,
      router,
      messageService,
      title,
      errorHandler,
      loadingService,
      confirmation
    );
  }

}