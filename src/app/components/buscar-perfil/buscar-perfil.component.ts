import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { Perfil } from '../../model/perfil';
import { PerfilFiltro, PerfilService } from '../../service/perfil.service';
import { ErrorHandlerService } from '../../configuration/core/error-handler.service';
import { LoadingService } from '../../configuration/core/loading.service';
import { UpperCaseDirective } from '../../configuration/shared/upper-case.directive';

@Component({
  selector: 'app-buscar-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule, UpperCaseDirective, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, TableModule, DialogModule],
  templateUrl: './buscar-perfil.component.html',
  styleUrl: './buscar-perfil.component.css'
})
export class BuscarPerfilComponent implements OnInit {

  @Input() model!: Perfil;
  @Input() desabilitar!: boolean;
  @Output() seleciona = new EventEmitter();
  @Input() validacao!: boolean;
  @Input() required: boolean = false;
  @Input() name: string = "perfil";
  @Input() label: string = "Perfil";

  visibleDialogEntidade!: boolean;
  selecionados!: Perfil[];
  filtro = new PerfilFiltro();
  totalRegistros = 0;
  entidadeSelecionada = new Perfil();
  idSelecionado!: number;

  constructor(
    private entidadeService: PerfilService,
    private errorHandler: ErrorHandlerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.model = new Perfil();
  }

  showDialogEntidade() {
    this.limparFiltro();
    this.pesquisarEntidade();
    this.selecionados = [];
    this.visibleDialogEntidade = true;
  }

  pesquisarEntidade(pagina = 0) {
    this.filtro.pagina = pagina;
    this.filtro.itensPorPagina = 10;

    this.loadingService.show();
    this.entidadeService
      .pesquisar(this.filtro).then((resultado) => {
        this.totalRegistros = resultado.total;
        this.selecionados = resultado.selecionados;
        this.loadingService.hide();
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.loadingService.hide();
      });
  }

  buscarEntidade(id: number) {
    this.loadingService.show();
    this.entidadeService.buscar(id)
      .then((dados) => {
        this.entidadeSelecionada = dados;
        this.loadingService.hide();
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.loadingService.hide();
      });
  }

  aoMudarPagina(event: any) {
    const pagina = event.first / event.rows;
    this.pesquisarEntidade(pagina);
  }

  selecionarEntidade(entidade:any) {
    this.buscarEntidade(entidade.id);
    this.idSelecionado = entidade.id;
  }

  limparFiltro() {
    this.filtro = new PerfilFiltro();
    this.totalRegistros = 0;
    this.selecionados = [];
  }

  confirmarModal(entidade: any) {
    if (entidade) {
      this.seleciona.emit(entidade);
    }
    this.limparFiltro();
    this.selecionados = [];
    this.visibleDialogEntidade = false;
  }

  cancelarModal() {
    this.limparFiltro();
    this.selecionados = [];
    this.visibleDialogEntidade = false;
  }

}