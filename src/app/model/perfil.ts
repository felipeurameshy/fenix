import { Permissao } from "./permissao";

export class Perfil {
    id!: number;
    descricao!: String;
    permissoes = new Array<PerfilPermissao>();
    descricaoCompleta!: String;
}

export class PerfilPermissao {
    id!: number;
    permissao = new Permissao();

    constructor(permissao: Permissao){
      this.permissao = permissao;
    }
}