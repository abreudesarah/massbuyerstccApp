import { HttpClient, HttpParams } from '@angular/core/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fornecedor } from '../scripts/model';

export class FornecedorFiltro {
  nome: string;
  cnpj: number;
  telefone: number;
  descricao: string;
  email: string;
  senha: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  provideIn: 'root'
})
export class FornecedorService {
  fornecedorUrl: string;

  constructor(private http: HttpClient){
    this.fornecedorUrl = `${environment.apiUrl}/fornecedores`;
  }


  pesquisar(filtro: FornecedorFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.email) {
      params = params.append('email', filtro.email);
    }

    if (filtro.cnpj) {
      params = params.append('cnpj', filtro.cnpj);
    }

    if (filtro.senha) {
      params = params.append('senha', filtro.senha);
    }

    if (filtro.telefone) {
      params = params.append('telefone', filtro.telefone);
    }

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    return this.http.get<any>(`${this.fornecedorUrl}`, {params})
    .toPromise()
    .then(response => {
      const fornecedores = response.content;


    })





  }
}

