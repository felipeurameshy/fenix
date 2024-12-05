import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ErrorHandlerService } from '../../configuration/core/error-handler.service';
import { SystemService } from '../../configuration/core/system.service';
import { AuthorizationService } from '../../configuration/security/authorization.service';
import { MenuService } from '../../configuration/core/menu.service';

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
    public router: Router,
    public confirmation: ConfirmationService,
    public errorHandler: ErrorHandlerService,
    public authorizationService: AuthorizationService,
    public systemService: SystemService,
    public menuService: MenuService,
  ) {}

  ngOnInit() {
    this.carregarVersaoApi();
  }

  exibirMenu() {
    return this.router.url !== '/login' && !this.router.url.includes('/pedido/catalogo') && !this.router.url.includes('/pedido/produto') 
    && !this.router.url.includes('/pedido/carrinho') && !this.router.url.includes('/pedido/entrega');
  }

  mostrarMenuLateral(){
    this.mostrarMenu = !this.mostrarMenu;
    this.menuService.exibirMenu(this.mostrarMenu);
  }


  logout() {
    this.mostrarMenu = false;
    this.menuService.exibirMenu(this.mostrarMenu);
    this.authorizationService.logout();
  }

  carregarVersaoApi() {
    this.systemService.versaoApi()
    .then((dados: { mensagem: string; }) => {
      if(dados){
        this.versaoApi = dados.mensagem;
      }
    })
  }

  navegar(menu:any){
    this.router.navigate([menu]);    
  }

}