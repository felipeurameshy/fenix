import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

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
import { AuthorizationService } from '../../../configuration/security/authorization.service';
import { Produto } from '../../../model/produto';
import { ProdutoFiltro, ProdutoService } from '../../../service/produto.service';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, FieldsetModule, BreadcrumbModule, 
    ToastModule, MenuListComponent, CurrencyPipe],
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.css'
})
export class ProdutoListComponent extends BaseResourceListComponent<Produto, ProdutoFiltro> {

  constructor(
    entidadeService: ProdutoService,
    title: Title,
    messageService: MessageService,
    errorHandler: ErrorHandlerService,
    router: Router,
    loadingService: LoadingService,
    authorizationService: AuthorizationService) {
    super(
      entidadeService,
      "/produto",
      "filtroProduto",
      new ProdutoFiltro(),
      "Lista de Produtos",
      [{label:'Fênix'},{label: 'Cadastro'},{label: 'Lista de Produtos'}],
      title,
      messageService,
      errorHandler,
      router,
      loadingService,
      authorizationService
    );
  }

}