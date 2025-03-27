import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Pedidos } from '../models/pedidos.models';
import { Observable } from 'rxjs';
import { PedidoDTO } from '../models/pedidos.dto';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = environment.apiUrl + 'pedidos/';
  constructor(private http: HttpClient) { }

      getPedidos(): Observable<PedidoDTO[]> {
        return this.http.get<PedidoDTO[]>(this.apiUrl);
      }
      createPedidos(pedidos: Pedidos): Observable<Pedidos> {
        return this.http.post<Pedidos>(this.apiUrl, pedidos);
      }
      updatePedidos(pedidos: Pedidos): Observable<Pedidos> {
        return this.http.put<Pedidos>(`${this.apiUrl}${pedidos.id}`, pedidos);
      }
      deletePedidos(id: number): Observable<Pedidos> {
        return this.http.delete<Pedidos>(this.apiUrl + id);
      }
}

