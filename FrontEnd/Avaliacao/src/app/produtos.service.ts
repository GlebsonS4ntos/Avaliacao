import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from './Produto';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  url = 'https://localhost:44308/api/Produtos';

  constructor(private http: HttpClient){}
    //primeiro método
    PegarTodos(): Observable<Produto[]>{
      return this.http.get<Produto[]>(this.url);
    }

    //segundo metodo
    PegarPeloId(produtoId: number): Observable<Produto>{
      const apiUrl  = `${this.url}/${produtoId}`;
      return this.http.get<Produto>(apiUrl)
    }

    //terceiro Metodo
    SalvarProduto(produto: Produto): Observable<any>{
      return this.http.post<Produto>(this.url, produto, httpOptions);
    }

    //quarto metodo
    AtualizarProduto(produto: Produto): Observable<any> {
      return this.http.put<Produto>(this.url, produto, httpOptions);
    }

    //excluir
    ExcluirProduto(produtoId: number):Observable<any>{
      const apiUrl = `${this.url}/${produtoId}`;
      return this.http.delete<number>(apiUrl, httpOptions);
  }
}

