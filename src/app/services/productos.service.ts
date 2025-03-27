import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../models/Productos.models';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private apiUrl: string = environment.apiUrl +'productos/';

  constructor(private htpp:HttpClient) { }


getProductos():Observable<Productos[]>{
return this.htpp.get<Productos[]>(this.apiUrl);


}
createProductos(productos: Productos): Observable<Productos>{
return this.htpp.post<Productos>(this.apiUrl,productos);
}

updateProductos(productos: Productos): Observable<Productos>{
return this.htpp.put<Productos>(`${this.apiUrl }${ productos.id }`, productos);
}

deleteProductos(idProductos: number): Observable<Productos>{
return this.htpp.delete<Productos>(`${this.apiUrl}${idProductos}`);

}

} 




