import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ErrorHandlerService } from '../../configuration/core/error-handler.service';
import { LoadingService } from '../../configuration/core/loading.service';
import { MenuService } from '../../configuration/core/menu.service';
import { AuthorizationService } from '../../configuration/security/authorization.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, CommonModule, InputTextModule, ButtonModule],
})
export class LoginComponent implements OnInit {
  
  @ViewChild("formulario")
  formulario: FormControl = new FormControl();

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private loadingService: LoadingService,
    public messageService: MessageService,
    public menuService: MenuService,
  ) { }

  ngOnInit() {}

  login(email: string, senha: string) {
    if(email == null || email.length == 0 || senha == null || senha.length == 0){
      this.messageService.add({severity:'warn', summary:'Aviso!', detail:'Informe o login e a senha'});
    }else{
      this.loadingService.show();
      this.authorizationService.login(email.toUpperCase(), senha)
        .then(() => {
          this.router.navigate(['/principal']);
          this.loadingService.hide();
        })
        .catch(erro => {
          this.errorHandler.handle(erro);
          this.loadingService.hide();
        });
    }
    
  }

}