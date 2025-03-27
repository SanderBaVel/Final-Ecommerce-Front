import { Clientes } from "./clientes.models";

export interface Pedidos{
    id: number | null;
    cliente: Clientes;
    total: number;
    fechaCreacion: Date;
    estado: String;
}