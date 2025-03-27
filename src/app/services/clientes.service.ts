import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes.models';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = environment.apiUrl + 'clientes/';
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.apiUrl);
  }

  createCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.apiUrl, cliente);
  }
  updateCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.apiUrl}${cliente.id_cliente}`, cliente);
  }
  deleteCliente(id: number): Observable<Clientes> {
    return this.http.delete<Clientes>(this.apiUrl + id);
  }

}
