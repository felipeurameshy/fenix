import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';

import { BaseResourceListComponent } from '../../../configuration/generic/components/base-resource-list.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuListComponent } from '../../../components/menu-list/menu-list.component';
import { LoadingService } from '../../../configuration/core/loading.service';
import { SegurancaService } from '../../../configuration/security/seguranca.service';
import { Secao } from '../../../model/secao';
import { SecaoFiltro, SecaoService } from '../../../service/secao.service';

@Component({
  selector: 'app-secao-list',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, FieldsetModule, BreadcrumbModule, 
    ToastModule, MenuListComponent],
  templateUrl: './secao-list.component.html',
  styleUrl: './secao-list.component.css'
})
export class SecaoListComponent extends BaseResourceListComponent<Secao, SecaoFiltro> {

  constructor(
    entidadeService: SecaoService,
    title: Title,
    messageService: MessageService,
    errorHandler: ErrorHandlerService,
    router: Router,
    loadingService: LoadingService,
    segurancaService: SegurancaService) {
    super(
      entidadeService,
      "/secao",
      "filtroSecao",
      new SecaoFiltro(),
      "Lista de Seções",
      [{label:'Fênix'},{label: 'Cadastro'},{label: 'Lista de Seções'}],
      title,
      messageService,
      errorHandler,
      router,
      loadingService,
      segurancaService
    );
  }

}