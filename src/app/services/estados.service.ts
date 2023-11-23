import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Estado } from '../services/scripts/model';

export class EstadoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
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


      const resultado = {
        estado,
        total: response.totalElements
      };
      return resultado;
    });
  }

    adicionar(estado: Estado): Promise<Estado> {
      return this.http.post<Estado>(this.estadoUrl, estado).toPromise();
    }

    atualizar(estado: Estado): Promise<Estado> {
      return this.http.put<Estado>('${this.estadoUrl}/$(estado.id)', estado)
      .toPromise()
      .then(response => {
        const estadoAlterado = response;
        return estadoAlterado;
      });
    }

    excluir(id: number): Promise<void> {
      return this.http.delete(`${this.estadoUrl}/${id}`)
      .toPromise()
      .then (response => {
        const estado = response;
        return estado;
      });
    }



  }

