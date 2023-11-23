import { HttpClient, HttpParams } from '@angular/core/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estado } from '../scripts/model';

export class EstadoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  provideIn: 'root'
})
export class EstadoService {
  estadoUrl: string;

  constructor(private http: HttpClient){
    this.estadoUrl = `${environment.apiUrl}/estados`;
  }


  pesquisar(filtro: EstadoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.estadoUrl}`, {params})
    .toPromise()
    .then(response => {
      const estado = response.content;


    })





  }
}
