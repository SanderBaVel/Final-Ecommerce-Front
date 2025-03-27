import { Component } from '@angular/core';
import { Pedidos } from '../../models/pedidos.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidosService } from '../../services/pedidos.service';
import { Clientes } from '../../models/clientes.models';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-pedidos',
  standalone: false,
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  pedidos: Pedidos [] = [];
  clientesDisponibles: Clientes[] = []
  pedidosForm: FormGroup;
  tituloModal: string = 'agregar pedidos';
  isEditMode: Boolean = false;
  selectedProducto: any = null;

  constructor(private modalService: NgbModal,
    private pedidosService: PedidosService,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService 
  ){
       this.pedidosForm = this.formBuilder.group({
      id: [null],
      cliente: [null, Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      fechaCreacion: [new Date()],
      estado: ['PENDIENTE', Validators.required]
    });
  }

  ngOnInit(){
    this.loadPedidos
  }
  loadPedidos(){
    this.pedidosService.getPedidos().subscribe({

      next: data =>{
        this.pedidos = data;
        console.log('Pedidos cargados:', this.pedidos); 
      }
    });
  }

  abrirModal(modal: any, pedido?: Pedidos): void {
    this.isEditMode = !!pedido;
    this.tituloModal = this.isEditMode ? 'Editar Pedido' : 'Nuevo Pedido';
    
    if (pedido) {
      this.pedidosForm.patchValue(pedido);
    } else {
      this.pedidosForm.reset({
        total: 0,
        fechaCreacion: new Date(),
        estado: 'PENDIENTE'
      });
    }

    this.modalService.open(modal, { centered: true, size: 'lg' });
  }

  onSubmit(): void {
    if (this.pedidosForm.valid) {
      const pedidoData: Pedidos = this.pedidosForm.value;
      // Lógica para guardar/actualizar el pedido
    }
  }
}


