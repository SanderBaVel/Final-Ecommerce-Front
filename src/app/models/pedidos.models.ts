import { Clientes } from "./clientes.models";
import { Productos } from "./Productos.models";

export interface Pedidos{
    id: number | null;
    cliente: Clientes;
    total: number;
    fechaCreacion: Date;
    estado: string;
}