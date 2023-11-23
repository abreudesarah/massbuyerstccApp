import { Optional } from "@angular/core";

export class Cidades {
  id: number;
  nomecidade: string;
  estado: string;
}

export class Cliente {
  id: number;
  nome: string;
  email: string;
  nascimento: Date;
  senha: string;
  telefone: number;
}

export class Estado {
  id: number;
  nome: string;
}

export class Fornecedor {
  id: number;
  nome: string;
  cnpj: number;
  telefone: number;
  descricao: string;
  email: string;
  senha: string;
}

export class Produto {
  id: number;
  nome: string;
  precovenda: number;
  precorevenda: number;
  quantidade: number;
}

export class Subtipoprod {
  id: number;
  nome: string;
  tipoproduto: string;
}

export class Tipoprod {
  id: number;
  nome: string;
}

export class Venda {
  id: number;
  datavenda: Date;
  produto: string;
  fornecedor: string;
  cliente: string;
}


