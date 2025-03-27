import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Pedidos } from '../models/pedidos.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = environment.apiUrl + 'pedidos';
  constructor(private http: HttpClient) { }

    getPedidos(): Observable<Pedidos[]> {
      return this.http.get<Pedidos[]>(this.apiUrl);
    }
}

