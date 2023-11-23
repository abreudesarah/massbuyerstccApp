import { HttpClient, HttpParams } from '@angular/core/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tipoprod } from '../scripts/model';

export class TipoprodFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  provideIn: 'root'
})
export class TipoprodService {
  tipoprodUrl: string;

  constructor(private http: HttpClient){
    this.tipoprodUrl = `${environment.apiUrl}/tipoprod`;
  }


  pesquisar(filtro: TipoprodFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.tipoprodUrl}`, {params})
    .toPromise()
    .then(response => {
      const tipoprod = response.content;


    })





  }
}
