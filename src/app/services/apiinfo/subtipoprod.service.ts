import { HttpClient, HttpParams } from '@angular/core/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subtipoprod } from '../scripts/model';

export class SubtipoprodFiltro {
  nome: string;
  tipoproduto: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  provideIn: 'root'
})
export class SubtipoprodService {
  subtipoprodUrl: string;

  constructor(private http: HttpClient){
    this.subtipoprodUrl = `${environment.apiUrl}/subtipoprod`;
  }


  pesquisar(filtro: SubtipoprodFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.tipoproduto) {
      params = params.append('tipoproduto', filtro.tipoproduto);
    }

    return this.http.get<any>(`${this.subtipoprodUrl}`, {params})
    .toPromise()
    .then(response => {
      const subtipoprod = response.content;


    })





  }
}
