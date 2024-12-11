import { Fornecedor } from "./fornecedor";
import { Secao } from "./secao";

export class Produto {
    id!: number;
    eanTreze!: String;
    dataDesativacao!: Date;
    descricao!: String;
    descricaoReduzida!: String;
    produtoPai = new ProdutoVO();
    fornecedor = new Fornecedor();
    secao: Secao = new Secao();
    referencia!: String;
    marca!: String;
    status!: String;
    tipo!: String;
    valorCusto!: number;
    valorDesconto!: number;
    valorVenda!: number;
    valorVendaLiquido!: number;
    margem!: number;  
    imagem!: String;
    quantidadeEstoque!: String; //transient
}

export class ProdutoVO{
    id!: number;
    descricao!: String;
}