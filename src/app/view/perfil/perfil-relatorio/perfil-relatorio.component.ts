import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';

import { LoadingService } from '../../../configuration/core/loading.service';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { PerfilService } from '../../../service/perfil.service';

@Component({
  selector: 'app-perfil-relatorio',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, TooltipModule, FieldsetModule, BreadcrumbModule, 
    ToastModule, RadioButtonModule],
  templateUrl: './perfil-relatorio.component.html',
  styleUrl: './perfil-relatorio.component.css'
})
export class PerfilRelatorioComponent implements OnInit {

  items: MenuItem[] = [];
  tipoRelatorio = 'GERAL';

  constructor(
    private entidadeService: PerfilService,
    private title: Title,
    private errorHandler : ErrorHandlerService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    
    this.items = [      
      {label:'Fênix'}, {label:'Relatórios'}, {label:'Perfil'}
    ];

    this.title.setTitle ('Fênix - Relatório de Perfis');
  }

  gerarRelatorio() {    
    if(this.tipoRelatorio == 'GERAL'){
      this.relatorioGeral();
    }
  }

  relatorioGeral() {    
    this.loadingService.show();
    this.entidadeService.relatorioGeral()
      .then(relatorio => {      
        if(relatorio){
          const url = window.URL.createObjectURL(relatorio);  
          var element = document.createElement("a");
          element.download = "Relatorio de Perfis - Geral.pdf";
          element.href = url;
          element.click();      
          this.loadingService.hide(); 
        }
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.loadingService.hide(); 
      }); 
  }

}