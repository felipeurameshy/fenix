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
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuFormComponent } from '../../../components/menu-form/menu-form.component';
import { UpperCaseDirective } from '../../../configuration/shared/upper-case.directive';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Perfil } from '../../../model/perfil';
import { BuscarPerfilComponent } from '../../../components/buscar-perfil/buscar-perfil.component';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuFormComponent, UpperCaseDirective, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, DropdownModule, BuscarPerfilComponent, InputMaskModule, PasswordModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent extends BaseResourceFormComponent<Usuario> {

  public senhaConfirma!: string;
  
  public tipos = [
    {label: 'NORMAL', value:'NORMAL'},
    {label: 'ANALISTA', value:'ANALISTA'},
    {label: 'ADMINISTRADOR', value:'ADMINISTRADOR'}
  ]
  
  public tiposStatus = [
    {label: 'ATIVO', value:'ATIVO'},
    {label: 'INATIVO', value:'INATIVO'}
  ]

  constructor(
    entidadeService: UsuarioService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler : ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/usuario/listar",
      "Usuário",
      [{label:'Fênix'},{label: 'Segurança'},{label: 'Usuário'}],
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
    super.ngOnInit();
  }

  override configurarFormulario(){
    this.entidade.status = "ATIVO";
    this.entidade.perfil = new Perfil();
  }

  override salvar(form: FormControl){
    if(this.verificarSenhaValida()){
      super.salvar(form);
    }
  }

  override buscar(id: number) {
    this.loadingService.show();
    this.resourceService.buscar(id)
      .then( dados => {
        this.entidade = dados;        
        this.senhaConfirma = dados.senha;
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

  public selecionarPerfil (perfil: Perfil){
    this.entidade.perfil = perfil;
  }

  public verificarSenhaValida(): boolean{
    if(this.entidade.senha != this.senhaConfirma){
      this.messageService.add({severity:'error', summary:'Erro', detail:'As senhas são diferentes'});
      return false;
    }else{
      return true;
    }
  }

}