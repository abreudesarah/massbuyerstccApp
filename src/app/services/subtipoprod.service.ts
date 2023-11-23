import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subtipoprod } from '../services/scripts/model';

export class SubtipoprodFiltro {
  nome: string;
  tipoproduto: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  providedIn: 'root'
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

      const resultado = {
        subtipoprod,
        total: response.totalElements
      };
      return resultado;
    });
  }

    adicionar(subtipoprod: Subtipoprod): Promise<Subtipoprod> {
      return this.http.post<Subtipoprod>(this.subtipoprodUrl, subtipoprod).toPromise();
    }

    atualizar(subtipoprod: Subtipoprod): Promise<Subtipoprod> {
      return this.http.put<Subtipoprod>('${this.subtipoprodUrl}/$(subtipoprod.id)', subtipoprod)
      .toPromise()
      .then(response => {
        const subtipoprodAlterado = response;
        return subtipoprodAlterado;
      });
    }

    excluir(id: number): Promise<void> {
      return this.http.delete(`${this.subtipoprodUrl}/${id}`)
      .toPromise()
      .then (response => {
        const subtipoprod = response;
        return subtipoprod;
      });
    }



  }


