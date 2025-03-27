import { Clientes } from "./clientes.models";

export interface PedidoDTO {
    id: number | null;
    idCliente: Clientes;  // Solo necesitamos el ID para crear/actualizar
    total: number;
    fechaCreacion: Date;
    estado: string;
    clienteNombre?: string;  // Opcional para mostrar en la UI
  }