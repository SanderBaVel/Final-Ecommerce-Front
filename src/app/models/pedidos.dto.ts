export interface PedidoDTO {
    id: number | null;
    id_cliente: number;  
    total: number;
    fechaCreacion: Date;
    estado: string;
    clienteNombre: string;  
  }