import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tipoprod } from '../services/scripts/model';
import { HttpClient, HttpParams } from '@angular/common/http';

export class TipoprodFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  providedIn: 'root'
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

      const resultado = {
        tipoprod,
        total: response.totalElements
      };
      return resultado;
    });
  }

    adicionar(tipoprod: Tipoprod): Promise<Tipoprod> {
      return this.http.post<Tipoprod>(this.tipoprodUrl, tipoprod).toPromise();
    }

    atualizar(tipoprod: Tipoprod): Promise<Tipoprod> {
      return this.http.put<Tipoprod>('${this.tipoprodUrl}/$(tipoprod.id)', tipoprod)
      .toPromise()
      .then(response => {
        const tipoprodAlterado = response;
        return tipoprodAlterado;
      });
    }

    excluir(id: number): Promise<void> {
      return this.http.delete(`${this.tipoprodUrl}/${id}`)
      .toPromise()
      .then (response => {
        const tipoprod = response;
        return tipoprod;
      });
    }

  }


