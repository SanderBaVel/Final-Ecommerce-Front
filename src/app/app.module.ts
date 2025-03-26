import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductosComponent } from './components/productos/productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    NavbarComponent,
    ProductosComponent,
    PedidosComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
