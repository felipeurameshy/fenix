import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { ErrorHandlerService } from '../../configuration/core/error-handler.service';
import { LoadingService } from '../../configuration/core/loading.service';
import { DropdownModule } from 'primeng/dropdown';
import { CategoriaFiltro, CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../model/categoria';

@Component({
  selector: 'app-select-categoria',
  standalone: true,
  imports: [FormsModule, CommonModule, InputTextModule, DropdownModule, ButtonModule, TooltipModule],
  templateUrl: './select-categoria.component.html',
  styleUrl: './select-categoria.component.css'
})
export class SelectCategoriaComponent implements OnInit {

  @Input() model!: Categoria;
  @Input() desabilitar!: boolean;
  @Output() seleciona = new EventEmitter();
  @Input() validacao!: boolean;
  @Input() required: boolean = false;
  @Input() name: string = "categoria";
  @Input() label: string = "Categoria";

  lista = [];
  filtro = new CategoriaFiltro();
  filterValue!: string;

  constructor(
    private entidadeService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.model = new Categoria();
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
    this.filtro = new CategoriaFiltro();
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