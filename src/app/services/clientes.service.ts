import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../services/scripts/model';

export class ClientesFiltro {
  nome: string;
  email: string;
  senha: string;
  telefone: number;
  pagina = 0;
  itensPorPagina = `${environment.qtdeRegistrosPesquisa}`;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  clientesUrl: string;

  constructor(private http: HttpClient){
    this.clientesUrl = `${environment.apiUrl}/clientes`;
  }


  pesquisar(filtro: ClientesFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.email) {
      params = params.append('email', filtro.email);
    }

    if (filtro.senha) {
      params = params.append('senha', filtro.senha);
    }

    if (filtro.telefone) {
      params = params.append('telefone', filtro.telefone);
    }

    return this.http.get<any>(`${this.clientesUrl}`, {params})
    .toPromise()
    .then(response => {
      const clientes = response.content;

      const resultado = {
        clientes,
        total: response.totalElements
      };
      return resultado;
    });
  }

    adicionar(clientes: Cliente): Promise<Cliente> {
      return this.http.post<Cliente>(this.clientesUrl, clientes).toPromise();
    }

    atualizar(clientes: Cliente): Promise<Cliente> {
      return this.http.put<Cliente>('${this.clientesUrl}/$(clientes.id)', clientes)
      .toPromise()
      .then(response => {
        const clientesAlterado = response;
        return clientesAlterado;
      });
    }

    excluir(id: number): Promise<void> {
      return this.http.delete(`${this.clientesUrl}/${id}`)
      .toPromise()
      .then (response => {
        const clientes = response;
        return clientes;
      });
    }



  }

