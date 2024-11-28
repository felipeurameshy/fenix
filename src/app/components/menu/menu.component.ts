import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { ErrorHandlerService } from '../../configuration/core/error-handler.service';
import { MenuService } from '../../configuration/core/menu.service';
import { AuthorizationService } from '../../configuration/security/authorization.service';
import { SystemService } from '../../configuration/core/system.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  imports: [FormsModule, CommonModule, AutoCompleteModule],
})
export class MenuComponent {

  mostrarMenu = false;
  itemMenuSelecionado: any;
  itensMenuSelecionados: any[] = [];
  itensMenu: any[] = [];
  public versaoApi!: string;

  constructor(
    public authorizationService: AuthorizationService,
    public systemService: SystemService,
    public router: Router,
    public confirmation: ConfirmationService,
    public errorHandler: ErrorHandlerService,
    public menuService: MenuService,
  ) {}

  ngOnInit() {
    this.carregarVersaoApi();
  }

  exibirMenu() {
    return this.router.url !== '/login';
  }

  mostrarMenuLateral(){
    this.mostrarMenu = !this.mostrarMenu;
    this.menuService.exibirMenu(this.mostrarMenu);
  }

  logout() {
    this.authorizationService.logout();
    this.router.navigate(['/login']);
    this.mostrarMenu = false;
    this.menuService.exibirMenu(this.mostrarMenu);
    sessionStorage.clear();
  }

  carregarVersaoApi() {
    this.systemService.versaoApi()
    .then((dado: { mensagem: string; }) => {
      if(dado){
        this.versaoApi = dado.mensagem;
      }
    })
  }

  navegar(menu:any){
    this.router.navigate([menu]);    
  }

}