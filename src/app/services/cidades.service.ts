import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cidades } from '../services/scripts/model';

export class CidadesFiltro {
  nome: string;
  nomecidade: string;
  estado: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  providedIn: 'root'
})
export class CidadesService {
    cidadeUrl: string;

    constructor(private http: HttpClient){
      this.cidadeUrl = `${environment.apiUrl}/cidades`;
    }
    pesquisar(filtro: CidadesFiltro): Promise<any> {
      let params = new HttpParams({
        fromObject: {
          page: filtro.pagina.toString(),
          size: filtro.itensPorPagina.toString()
        }
      });
      if (filtro.nome) {
        params = params.append('nome', filtro.nome);
      }

      if (filtro.nomecidade) {
        params = params.append('nomecidade', filtro.nomecidade);
      }

      if (filtro.estado) {
        params = params.append('estado', filtro.estado);
      }

      return this.http.get<any>(`${this.cidadeUrl}`, {params})
      .toPromise()
      .then(response => {
        const cidades = response.content;

        const resultado = {
          cidades,
          total: response.totalElements
        };
        return resultado;
      });
    }

      adicionar(cidades: Cidades): Promise<Cidades> {
        return this.http.post<Cidades>(this.cidadeUrl, cidades).toPromise();
      }

      atualizar(cidade: Cidades): Promise<Cidades> {
        return this.http.put<Cidades>('${this.cidadeUrl}/$(cidades.id)', cidade)
        .toPromise()
        .then(response => {
          const cidadesAlterado = response;
          return cidadesAlterado;
        });
      }

      excluir(id: number): Promise<void> {
        return this.http.delete(`${this.cidadeUrl}/${id}`)
        .toPromise()
        .then (response => {
          const cidades = response;
          return cidades;
        });
      }
}
