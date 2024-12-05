import { Routes } from '@angular/router';

import { SegurancaGuard } from './configuration/guard/seguranca.guard';
import { SegurancaDeactivateGuard } from './configuration/guard/seguranca.deactivate.guard';
import { LoginComponent } from './components/login/login.component';
import { AcessoNaoAutorizadoComponent } from './components/acesso-nao-autorizado/acesso-nao-autorizado.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthorizedComponent } from './configuration/security/authorized/authorized.component';
import { PerfilFormComponent } from './view/perfil/perfil-form/perfil-form.component';
import { PerfilRelatorioComponent } from './view/perfil/perfil-relatorio/perfil-relatorio.component';
import { PerfilListComponent } from './view/perfil/perfil-list/perfil-list.component';
import { PermissaoFormComponent } from './view/permissao/permissao-form/permissao-form.component';
import { PermissaoListComponent } from './view/permissao/permissao-list/permissao-list.component';
import { UsuarioFormComponent } from './view/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './view/usuario/usuario-list/usuario-list.component';
import { UsuarioRelatorioComponent } from './view/usuario/usuario-relatorio/usuario-relatorio.component';
import { SecaoFormComponent } from './view/secao/secao-form/secao-form.component';
import { SecaoListComponent } from './view/secao/secao-list/secao-list.component';
import { ClienteFormComponent } from './view/cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './view/cliente/cliente-list/cliente-list.component';
import { CategoriaListComponent } from './view/categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './view/categoria/categoria-form/categoria-form.component';
import { DespesaFormComponent } from './view/despesa/despesa-form/despesa-form.component';
import { DespesaListComponent } from './view/despesa/despesa-list/despesa-list.component';;
import { FornecedorListComponent } from './view/fornecedor/fornecedor-list/fornecedor-list.component';
import { FornecedorFormComponent } from './view/fornecedor/fornecedor-form/fornecedor-form.component';

export const routes: Routes = [

  //Categoria
  {
    path: 'categoria/novo',
    component: CategoriaFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['CATEGORIA_INCLUIR']}
  },
  {
    path: 'categoria/listar',
    component: CategoriaListComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['CATEGORIA_CONSULTAR']}
  },
  {
    path: 'categoria/editar/:id',
    component: CategoriaFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['CATEGORIA_ALTERAR']}
  },
  {
    path: 'categoria/:id/:consulta/:tipo',
    component: CategoriaFormComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['CATEGORIA_CONSULTAR']}
  },

  //Cliente
  {
    path: 'cliente/novo',
    component: ClienteFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['CLIENTE_INCLUIR']}
  },
  {
    path: 'cliente/listar',
    component: ClienteListComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['CLIENTE_CONSULTAR']}
  },
  {
    path: 'cliente/editar/:id',
    component: ClienteFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['CLIENTE_ALTERAR']}
  },
  {
    path: 'cliente/:id/:consulta/:tipo',
    component: ClienteFormComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['CLIENTE_CONSULTAR']}
  },

  //Despesa
  {
    path: 'despesa/novo',
    component: DespesaFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['DESPESA_INCLUIR']}
  },
  {
    path: 'despesa/listar',
    component: DespesaListComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['DESPESA_CONSULTAR']}
  },
  {
    path: 'despesa/editar/:id',
    component: DespesaFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['DESPESA_ALTERAR']}
  },
  {
    path: 'despesa/:id/:consulta/:tipo',
    component: DespesaFormComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['DESPESA_CONSULTAR']}
  },

  //Fornecedor
  {
    path: 'fornecedor/novo',
    component: FornecedorFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['FORNECEDOR_INCLUIR']}
  },
  {
    path: 'fornecedor/listar',
    component: FornecedorListComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['FORNECEDOR_CONSULTAR']}
  },
  {
    path: 'fornecedor/editar/:id',
    component: FornecedorFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['FORNECEDOR_ALTERAR']}
  },
  {
    path: 'fornecedor/:id/:consulta/:tipo',
    component: FornecedorFormComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['FORNECEDOR_CONSULTAR']}
  },  

  //Perfil
  {
    path: 'perfil/novo',
    component: PerfilFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['PERFIL_INCLUIR']}
  },
  {
    path: 'perfil/listar',
    component: PerfilListComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['PERFIL_CONSULTAR']}
  },
  {
    path: 'perfil/editar/:id',
    component: PerfilFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['PERFIL_ALTERAR']}
  },
  {
    path: 'perfil/:id/:consulta/:tipo',
    component: PerfilFormComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['PERFIL_CONSULTAR']}
  },
  {
    path: 'perfil/relatorio',
    component: PerfilRelatorioComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['PERFIL_RELATORIO']}
  },

  //Permissão
  {
    path: 'permissao/novo',
    component: PermissaoFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['PERMISSAO_INCLUIR']}
  },
  {
    path: 'permissao/listar',
    component: PermissaoListComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['PERMISSAO_CONSULTAR']}
  },
  {
    path: 'permissao/editar/:id',
    component: PermissaoFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['PERMISSAO_ALTERAR']}
  },
  {
    path: 'permissao/:id/:consulta/:tipo',
    component: PermissaoFormComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['PERMISSAO_CONSULTAR']}
  },

  //Secao
  {
    path: 'secao/novo',
    component: SecaoFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['SECAO_INCLUIR']}
  },
  {
    path: 'secao/listar',
    component: SecaoListComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['SECAO_CONSULTAR']}
  },
  {
    path: 'secao/editar/:id',
    component: SecaoFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['SECAO_ALTERAR']}
  },
  {
    path: 'secao/:id/:consulta/:tipo',
    component: SecaoFormComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['SECAO_CONSULTAR']}
  },


  //Usuário
  {
    path: 'usuario/novo',
    component: UsuarioFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['USUARIO_INCLUIR']}
  },
  {
    path: 'usuario/listar',
    component: UsuarioListComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['USUARIO_CONSULTAR']}
  },
  {
    path: 'usuario/editar/:id',
    component: UsuarioFormComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['USUARIO_ALTERAR']}
  },
  {
    path: 'usuario/:id/:consulta/:tipo',
    component: UsuarioFormComponent,
    canActivate:[SegurancaGuard],
    data: { roles: ['USUARIO_CONSULTAR']}
  },
  {
    path: 'usuario/relatorio',
    component: UsuarioRelatorioComponent,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['USUARIO_RELATORIO']}
  },


  //Geral
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'authorized',
    component: AuthorizedComponent,
  },
  {
    path: 'principal',
    component: PaginaPrincipalComponent,
    canActivate: [SegurancaGuard],
  },
  {
    path: 'acesso-nao-autorizado',
    component: AcessoNaoAutorizadoComponent,
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada',
  },
  {
    path: 'pagina-nao-encontrada',
    component: PaginaNaoEncontradaComponent,
  },

];