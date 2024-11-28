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
import { Categoria } from '../../../model/categoria';
import { CategoriaFiltro, CategoriaService } from '../../../service/categoria.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, FieldsetModule, BreadcrumbModule, 
    ToastModule, MenuListComponent],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent extends BaseResourceListComponent<Categoria, CategoriaFiltro> {

  constructor(
    entidadeService: CategoriaService,
    title: Title,
    messageService: MessageService,
    errorHandler: ErrorHandlerService,
    router: Router,
    loadingService: LoadingService,
    segurancaService: SegurancaService) {
    super(
      entidadeService,
      "/categoria",
      "filtroCategoria",
      new CategoriaFiltro(),
      "Lista de Categorias",
      [{label:'Fênix'},{label: 'Cadastro'},{label: 'Lista de Categorias'}],
      title,
      messageService,
      errorHandler,
      router,
      loadingService,
      authorizationService
    );
  }

}