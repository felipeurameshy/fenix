import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { ErrorHandlerService } from '../../configuration/core/error-handler.service';
import { LoadingService } from '../../configuration/core/loading.service';
import { DropdownModule } from 'primeng/dropdown';
import { ProdutoVO } from '../../model/produto';
import { ProdutoFiltro, ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-select-produto-pai',
  standalone: true,
  imports: [FormsModule, CommonModule, InputTextModule, DropdownModule, ButtonModule, TooltipModule],
  templateUrl: './select-produto-pai.component.html',
  styleUrl: './select-produto-pai.component.css'
})
export class SelectProdutoPaiComponent implements OnInit {

  @Input() model!: ProdutoVO;
  @Input() desabilitar!: boolean;
  @Output() seleciona = new EventEmitter();
  @Input() validacao!: boolean;
  @Input() required: boolean = false;
  @Input() name: string = "produto";
  @Input() label: string = "Produto";

  lista = [];
  filtro = new ProdutoFiltro();
  filterValue!: string;

  constructor(
    private entidadeService: ProdutoService,
    private errorHandler: ErrorHandlerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.model = new ProdutoVO();
    this.listarTodos();
  }

  carregarProdutos(){
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
    this.filtro = new ProdutoFiltro();
    this.carregarProdutos();
  }

  filtrar() {
    if(this.filterValue.length > 1){
      this.filtro.descricao = this.filterValue;
      this.carregarProdutos();
    }    
  }

  confirmar(){    
    if (this.model.id) {
      this.seleciona.emit(this.model);
    }
  }

  listarTodos(){
    this.loadingService.show()          
    this.entidadeService.listarProdutosVO()
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