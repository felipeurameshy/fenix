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
import { PickListModule } from 'primeng/picklist';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { Perfil, PerfilPermissao } from '../../../model/perfil';
import { PerfilService } from '../../../service/perfil.service';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuFormComponent } from '../../../components/menu-form/menu-form.component';
import { UpperCaseDirective } from '../../../configuration/shared/upper-case.directive';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Permissao } from '../../../model/permissao';
import { PermissaoService } from '../../../service/permissao.service';

@Component({
  selector: 'app-perfil-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuFormComponent, UpperCaseDirective, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, PickListModule],
  templateUrl: './perfil-form.component.html',
  styleUrl: './perfil-form.component.css'
})
export class PerfilFormComponent extends BaseResourceFormComponent<Perfil> {

  permissoes!: Permissao[];
  permissoesSelecionadas: Permissao[] = [];

  constructor(
    public entidadeService: PerfilService,
    public permissaoService: PermissaoService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler : ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/perfil/listar",
      "Perfil",
      [{label:'Fênix'},{label: 'Segurança'},{label: 'Perfil'}],
      route,
      router,
      messageService,
      title,
      errorHandler,
      loadingService,
      confirmation
    );
  }

  override ngOnInit(): void {
    this.items = this.itensMenu;

    this.idEntidade = this.route.snapshot.params['id'];
    this.consulta = this.route.snapshot.params['consulta'];
    this.tipoMenu = this.route.snapshot.params['tipo'];

    this.configurarFormulario();

    if(this.idEntidade){
      this.buscar(this.idEntidade);
    }else{
      this.title.setTitle ('Fênix - Inclusão ' + this.nomeTitle);
      this.carregarPermissoes();
    }
  }

  override buscar(codigo: number) {
    this.loadingService.show();
    this.resourceService.buscar(codigo)
      .then( dados => {
        this.entidade = dados;
        this.preencherPermissaoPerfil(dados);
        this.carregarPermissoes();
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

  override salvar(form: FormControl) {
    if(this.verificarFormularioValido(form)){
      this.preencherPermissaoPerfilParaSalvar();
      if (this.entidade.id){
        this.alterar(form);
      } else {
        this.incluir(form);
      }
    }
  }

  carregarPermissoes() {
    this.permissaoService.listar()
      .then(dados => {
        this.removerPermissaoSelecionadaDeListaDePermissoes(dados);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  preencherPermissaoPerfilParaSalvar(){

    this.entidade.permissoes = new Array<PerfilPermissao>();

    for(let i = 0; i < this.permissoesSelecionadas.length; i++) {
      let permissao: Permissao = this.permissoesSelecionadas[i];
      let entidadePermissao = new PerfilPermissao(permissao);
      this.entidade.permissoes.push(entidadePermissao);
    }

  }

  preencherPermissaoPerfil(dados: any) {    
    if(dados.permissoes){      
      for(let i = 0; i < dados.permissoes.length; i++) {      
        this.permissoesSelecionadas.push(dados.permissoes[i].permissao);        
      }
    }
  }

  removerPermissaoSelecionadaDeListaDePermissoes(permissoes: any[]){
    let adicionada = false;
    this.permissoes = [];    

    for(let k=0; k < permissoes.length; k++){
      for(let i = 0; i < this.permissoesSelecionadas.length; i++) {
        if(this.permissoesSelecionadas[i].id == permissoes[k].id){          
          adicionada = true;
        }
      }
      if(!adicionada){
        this.permissoes.push(permissoes[k]);
      }
      adicionada = false;
    }
  }

}
