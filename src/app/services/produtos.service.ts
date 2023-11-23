import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../services/scripts/model';

export class ProdutoFiltro {
  nome: string;
  precovenda: number;
  precorevenda: number;
  quantidade: number;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  produtosUrl: string;

  constructor(private http: HttpClient){
    this.produtosUrl = `${environment.apiUrl}/produtos`;
  }


  pesquisar(filtro: ProdutoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.precovenda) {
      params = params.append('precovenda', filtro.precovenda);
    }

    if (filtro.precorevenda) {
      params = params.append('precorevenda', filtro.precorevenda);
    }

    if (filtro.quantidade) {
      params = params.append('quantidade', filtro.quantidade);
    }

    return this.http.get<any>(`${this.produtosUrl}`, {params})
    .toPromise()
    .then(response => {
      const produtos = response.content;

      const resultado = {
        produtos,
        total: response.totalElements
      };
      return resultado;
    });
  }

    adicionar(produtos: Produto): Promise<Produto> {
      return this.http.post<Produto>(this.produtosUrl, produtos).toPromise();
    }

    atualizar(produtos: Produto): Promise<Produto> {
      return this.http.put<Produto>('${this.produtosUrl}/$(produtos.id)', produtos)
      .toPromise()
      .then(response => {
        const produtosAlterado = response;
        return produtosAlterado;
      });
    }

    excluir(id: number): Promise<void> {
      return this.http.delete(`${this.produtosUrl}/${id}`)
      .toPromise()
      .then (response => {
        const produto = response;
        return produto;
      });
    }



  }


