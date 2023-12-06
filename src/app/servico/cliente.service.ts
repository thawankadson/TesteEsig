import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = 'http://localhost:8080';

  // Construtor
  constructor(private http: HttpClient) { }

  // Método para selecionar todos os clientes
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  // Método para cadastrar clientes
  cadastrar(obj: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, obj);
  }

  // Método para editar clientes
  editar(obj: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url, obj);
  }

  // Método para remover clientes
  remover(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }

  pegaOne(id: number): Observable<Cliente> {
    const link = this.url + '/' + id;
    console.log(link);
    return this.http.get<Cliente>(link)
  }

  filtrar(titulo: string): Observable<any> {
    const params = new HttpParams().set('titulo', titulo || '');
    const link = this.url + '/filtro/todos';

    return this.http.get(link, { params });
  }

}
