import { Pensamento } from './pensamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';
  private readonly itensPorPagina = 6;

  constructor(private http: HttpClient) {}

  private getUrlWithId(id: number) {
    return `${this.API}/${id}`;
  }

  listar(
    filtro: string,
    pagina: number,
    ehFavorito: boolean
  ): Observable<Pensamento[]> {
    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', this.itensPorPagina);

    params = filtro.trim().length > 2 ? params.set('q', filtro) : params;
    params = ehFavorito ? params.set('favorito', true) : params;
    
    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  exluir(id: number): Observable<Pensamento> {
    return this.http.delete<Pensamento>(this.getUrlWithId(id));
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.put<Pensamento>(
      this.getUrlWithId(pensamento.id!),
      pensamento
    );
  }

  buscarPorId(id: number): Observable<Pensamento> {
    return this.http.get<Pensamento>(this.getUrlWithId(id));
  }

  // buscarPorPensamento(busca: string, pagina: number): Observable<Pensamento[]> {
  //   const params = new HttpParams()
  //     .set('q', busca)
  //     .set('_page', pagina)
  //     .set('_limit', this.itensPorPagina);

  //   return this.http.get<Pensamento[]>(this.API, { params });
  // }
}
