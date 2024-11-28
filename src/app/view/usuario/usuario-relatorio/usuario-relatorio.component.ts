import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MenuItem, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';

import { LoadingService } from '../../../configuration/core/loading.service';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { UsuarioFiltro, UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-usuario-relatorio',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, TooltipModule, FieldsetModule, BreadcrumbModule, 
    ToastModule, RadioButtonModule, ScrollPanelModule, ListboxModule, DropdownModule],
  templateUrl: './usuario-relatorio.component.html',
  styleUrl: './usuario-relatorio.component.css'
})
export class UsuarioRelatorioComponent implements OnInit {

  items: MenuItem[] = [];  
  tipoRelatorio = 'GERAL';
  filtro = new UsuarioFiltro();
  tiposStatus!: any[];

  constructor(
    private entidadeService: UsuarioService,
    private title: Title,
    private errorHandler : ErrorHandlerService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    
    this.items = [   
      {label:'Fênix'}, {label:'Relatórios'}, {label:'Usuário'}
    ];

    this.tiposStatus = [
      {name: 'ATIVO', code:'ATIVO'},
      {name: 'INATIVO', code:'INATIVO'}
    ]

    this.title.setTitle ('Fênix - Relatório de Usuários');    
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
        element.download = "Relatorio de usuarios - Geral.pdf";
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