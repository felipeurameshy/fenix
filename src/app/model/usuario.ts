import { Perfil } from "./perfil";

export class Usuario {
    id!: number;
    nome!: String;
    cpf!: String;
    status!: String; //Enum
    email!: String;
    senha!: String;
    perfil = new Perfil();    
    codigoSenhaResetada!: String;
    dataSenhaResetada!: Date;
}