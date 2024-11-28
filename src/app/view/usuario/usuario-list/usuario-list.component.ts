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
import { Usuario } from '../../../model/usuario';
import { UsuarioFiltro, UsuarioService } from '../../../service/usuario.service';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuListComponent } from '../../../components/menu-list/menu-list.component';
import { LoadingService } from '../../../configuration/core/loading.service';
import { SegurancaService } from '../../../configuration/security/seguranca.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, FieldsetModule, BreadcrumbModule, 
    ToastModule, MenuListComponent],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent extends BaseResourceListComponent<Usuario, UsuarioFiltro> {

  constructor(
    entidadeService: UsuarioService,
    title: Title,
    messageService: MessageService,
    errorHandler: ErrorHandlerService,
    router: Router,
    loadingService: LoadingService,
    segurancaService: SegurancaService) {
    super(
      entidadeService,
      "/usuario",
      "filtroUsuario",
      new UsuarioFiltro(),
      "Lista de Usuários",
      [{label:'Fênix'},{label: 'Segurança'},{label: 'Lista de Usuários'}],
      title,
      messageService,
      errorHandler,
      router,
      loadingService,
      segurancaService
    );
  }

}