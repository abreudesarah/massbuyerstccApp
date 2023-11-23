import { HttpClient, HttpParams } from '@angular/core/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Venda } from '../scripts/model';

export class VendaFiltro {
  datavenda: Date;
  produto: string;
  fornecedor: string;
  cliente: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  provideIn: 'root'
})
export class VendaService {
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
    if (filtro.datavenda) {
      params = params.append('datavenda', filtro.datavenda);
    }

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


    })





  }
}
