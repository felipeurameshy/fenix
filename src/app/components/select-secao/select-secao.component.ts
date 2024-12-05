import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { ErrorHandlerService } from '../../configuration/core/error-handler.service';
import { LoadingService } from '../../configuration/core/loading.service';
import { DropdownModule } from 'primeng/dropdown';
import { SecaoFiltro, SecaoService } from '../../service/secao.service';
import { Secao } from '../../model/secao';

@Component({
  selector: 'app-select-secao',
  standalone: true,
  imports: [FormsModule, CommonModule, InputTextModule, DropdownModule, ButtonModule, TooltipModule],
  templateUrl: './select-secao.component.html',
  styleUrl: './select-secao.component.css',  
})
export class SelectSecaoComponent implements OnInit {

  @Input() model!: Secao;
  @Input() desabilitar!: boolean;
  @Output() seleciona = new EventEmitter();
  @Input() validacao!: boolean;
  @Input() required: boolean = false;
  @Input() name: string = "secao";
  @Input() label: string = "Seção";

  lista = [];
  filtro = new SecaoFiltro();
  filterValue!: string;

  constructor(
    private entidadeService: SecaoService,
    private errorHandler: ErrorHandlerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.model = new Secao();
    this.listarTodos();
  }

  carregar(){
    this.loadingService.show()    
    this.filtro.itensPorPagina = 5;        
    this.entidadeService.pesquisar(this.filtro)
      .then(resultado => {
        this.lista = resultado.selecionados;        
        this.loadingService.hide();        
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.loadingService.hide();
      });
  }


  limparFiltroSelect() {    
    this.filterValue = '';
    this.filtro = new SecaoFiltro();
    this.carregar();
  }

  filtrar() {
    if(this.filterValue.length > 1){
      this.filtro.descricao = this.filterValue;
      this.carregar();
    }    
  }

  confirmar(){    
    if (this.model.id) {
      this.seleciona.emit(this.model);
    }
  }

  listarTodos(){
    this.loadingService.show()      
    this.entidadeService.listar()
      .then(resultado => {        
        this.lista = resultado;             
        this.loadingService.hide();        
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.loadingService.hide();
      });
  }

}