export class Fornecedor {
    id!: number;   
    cnpjCpf!: string;
    razaoSocial!: string;
    nomeFantasia!: string;
    status!: String;
    observacao!: String;
    enderecos = new Array<FornecedorEndereco>();
    contatos = new Array<FornecedorContato>();
}

export class FornecedorContato {
    id!: number;
    tipo!: String;
    valor!: String;
    status!: String;
    principal!: boolean;
}

export class FornecedorEndereco {
    id!: number;
    cep!: String;
    estado!: String;
    cidade!: String;
    bairro!: String;
    endereco!: String;
    numero!: String;
    observacao!: String;
}