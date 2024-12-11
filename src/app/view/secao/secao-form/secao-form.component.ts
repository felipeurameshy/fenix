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
import { InputNumberModule } from 'primeng/inputnumber';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuFormComponent } from '../../../components/menu-form/menu-form.component';
import { LoadingService } from '../../../configuration/core/loading.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Secao } from '../../../model/secao';
import { SecaoService } from '../../../service/secao.service';

@Component({
  selector: 'app-secao-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuFormComponent, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, InputNumberModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './secao-form.component.html',
  styleUrl: './secao-form.component.css'
})
export class SecaoFormComponent extends BaseResourceFormComponent<Secao> {

  constructor(
    entidadeService: SecaoService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler : ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/secao/listar",
      "Seção",
      [{label:'Fênix'},{label: 'Cadastro'},{label: 'Seção'}],
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