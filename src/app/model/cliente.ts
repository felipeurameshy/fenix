export class Cliente {
    id!: number;  
    cnpjCpf!: string; 
    nome!: String;
    email!: String;
    telefone!: String;
    enderecos = new Array<ClienteEndereco>();
}

export class ClienteEndereco {
    id!: number;
    cep!: String;
    estado!: String;
    cidade!: String;
    bairro!: String;
    endereco!: String;
    numero!: String;
    observacao!: String;
}