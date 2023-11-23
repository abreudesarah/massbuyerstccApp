import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Venda } from '../services/scripts/model';

export class VendaFiltro {
  produto: string;
  fornecedor: string;
  cliente: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  vendaUrl: string;

  constructor(private http: HttpClient){
    this.vendaUrl = `${environment.apiUrl}/venda`;
  }


  pesquisar(filtro: VendaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.fornecedor) {
      params = params.append('fornecedor', filtro.fornecedor);
    }

    if (filtro.produto) {
      params = params.append('produto', filtro.produto);
    }

    if (filtro.cliente) {
      params = params.append('cliente', filtro.cliente);
    }

    return this.http.get<any>(`${this.vendaUrl}`, {params})
    .toPromise()
    .then(response => {
      const venda = response.content;


      const resultado = {
        venda,
        total: response.totalElements
      };
      return resultado;
    });
  }

    adicionar(venda: Venda): Promise<Venda> {
      return this.http.post<Venda>(this.vendaUrl, venda).toPromise();
    }

    atualizar(venda: Venda): Promise<Venda> {
      return this.http.put<Venda>('${this.vendaUrl}/$(venda.id)', venda)
      .toPromise()
      .then(response => {
        const vendaAlterado = response;
        return vendaAlterado;
      });
    }

    excluir(id: number): Promise<void> {
      return this.http.delete(`${this.vendaUrl}/${id}`)
      .toPromise()
      .then (response => {
        const venda = response;
        return venda;
      });
    }

  }

