import { Categoria } from "./categoria";

export class Despesa {
    id!: number;
    descricao!: string;
    dataDespesa!: Date;
    categoria = new Categoria();
    valorTotal!: number;
    itens = new Array<DespesaItem>();  
}

export class DespesaItem {
    id!: number;
    descricao!: string;
    quantidade!: number;
    valorUnitario!: number;
    valorTotal!: number;
}