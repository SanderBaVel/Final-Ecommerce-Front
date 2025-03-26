import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesService } from '../../services/clientes.service';
import { Clientes } from '../../models/clientes.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: Clientes[] = [];
  clienteForm: FormGroup;
  tituloModal: string = 'Agregar Nuevo Cliente';
  isEditMode: boolean = false;
  selectedCliente: any = null;

  constructor(private modalService: NgbModal,
    private clienteService: ClientesService,
    private formBuilder: FormBuilder) {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadClientes();
  }


  loadClientes(): void {
    this.clienteService.getClientes().subscribe({

      next: data => {
        this.clientes = data;
      }
    })
  }


  abrirModal(modal: any, cliente?: any): void {
    this.isEditMode = !!cliente;
    this.tituloModal = this.isEditMode ? 'Editar Cliente' : 'Agregar Nuevo Cliente';
    this.selectedCliente = cliente;

    if (this.isEditMode) {
      this.clienteForm.patchValue(cliente);
    } else {
      this.clienteForm.reset();
    }

    this.modalService.open(modal, {
      centered: true,
     
    });
  }

  // Maneja el envío del formulario
  onSubmit(): void {
    if (this.clienteForm.invalid) {
      // Marca todos los campos como touched para mostrar errores
      Object.values(this.clienteForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const clienteData: Clientes = this.clienteForm.value;
    if (this.isEditMode) {
      this.clienteService.updateCliente(clienteData).subscribe({
        next: (updateCliente) => {
          const index = this.clientes.findIndex(c => c.id_cliente === this.selectedCliente.id_cliente);
          if (index !== -1) {
            this.clientes[index] = updateCliente;
          }
          Swal.fire({
            title: "Cliente " + updateCliente.nombre + " actualizado",
            text: "El cliente fue actualizado exitosamente",
            icon: "success"
          });
          this.modalService.dismissAll();
          this.clienteForm.reset();
        },
        error: error => {
          this.mostrarErrores(error);
        }
      });
    } else {
      this.clienteService.createCliente(clienteData).subscribe({
        next: (newCliente) => {
          this.clientes.push(newCliente);
          Swal.fire({
            title: "Cliente " + newCliente.nombre + " creado",
            text: "El cliente fue creado exitosamente",
            icon: "success"
          });
        },
        error: error => {
          this.mostrarErrores(error);
        }
      });
      this.clienteForm.reset();
    }

    this.modalService.dismissAll();
  }

  editCliente(cliente: Clientes): void {
    this.isEditMode = true;
    this.selectedCliente = cliente;
    this.tituloModal = 'Editar Cliente';
    this.clienteForm.patchValue({
      id_cliente: cliente.id_cliente,
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      email: cliente.email
    });
  }
  
  mostrarErrores(errorResponse: any): void {
    if (errorResponse && errorResponse.error) {
      let errores = errorResponse.error;
      let mensajeErrores = "";
      for (let campo in errores) {
        if (errores.hasOwnProperty(campo)) {
          mensajeErrores += errores[campo];
        }
      }
      Swal.fire({
        title: "Errores encontrados",
        text: mensajeErrores.trim(),
        icon: "error"
      });
    }
  }

}
