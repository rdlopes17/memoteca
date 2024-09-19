import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  listar(pagina: number, filtro: string): Observable<Pensamento[]> {
    const itesPorPagina = 3;
    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itesPorPagina);

    if (filtro.trim().length > 2) {
      params = params.set('q', filtro);
    }
    // return this.http.get<Pensamento[]>(this.API); retorno simples
    return this.http.get<Pensamento[]>(this.API, { params });
  }

  listarPensamentosFavoritos(pagina: number, filtro: string): Observable<Pensamento[]>{
    const itesPorPagina = 3;
    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itesPorPagina)
      .set('favorito', true)

    if (filtro.trim().length > 2) {
      params = params.set('q', filtro);
    }
    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  ediar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    // const url = `${this.API}/${pensamento.id}`;  para evitar a repeticao de codigo podemos usar a chamada do metodo editar
    // return this.http.put<Pensamento>(url, pensamento);
    return this.ediar(pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }
}
