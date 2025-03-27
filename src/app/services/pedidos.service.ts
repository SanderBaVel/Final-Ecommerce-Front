import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Pedidos } from '../models/pedidos.models';
import { map, Observable } from 'rxjs';
import { PedidoDTO } from '../models/pedidos.dto';
import { Clientes } from '../models/clientes.models';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = environment.apiUrl + 'pedidos/';
  constructor(private http: HttpClient) { }

    // Obtener todos los pedidos (transformando a DTO)
    getPedidos(): Observable<PedidoDTO[]> {
      return this.http.get<Pedidos[]>(this.apiUrl).pipe(
        map(pedidos => this.toDTOArray(pedidos))
      );
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

      private toDTO(pedido: Pedidos): PedidoDTO {
        return {
          id: pedido.id,
          id_cliente: pedido.cliente.id_cliente || 0,
          clienteNombre: pedido.cliente.nombre,
          total: pedido.total,
          fechaCreacion: pedido.fechaCreacion,
          estado: pedido.estado
        };
      }

      private toDTOArray(pedidos: Pedidos[]): PedidoDTO[] {
        return pedidos.map(pedido => this.toDTO(pedido));
      }

      private toEntity(pedidoDTO: PedidoDTO): Partial<Pedidos> {
        return {
          id: pedidoDTO.id,
          cliente: { id_cliente: pedidoDTO.id_cliente } as Clientes,
          total: pedidoDTO.total,
          fechaCreacion: pedidoDTO.fechaCreacion,
          estado: pedidoDTO.estado
        };
      }
    
}

