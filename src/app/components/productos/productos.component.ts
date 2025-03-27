import { Component } from '@angular/core';
import { Productos } from '../../models/Productos.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  producto: Productos[] = [];
  productoForm: FormGroup;
  tituloModal: string = 'Agregar Nuevo Producto';
  isEditMode: boolean = false;
  selectedProdcutos: Productos | null = null;

  constructor(private productosService: ProductosService,
    private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.productoForm = formBuilder.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],

    })
  }


  ngOnInit(): void {

    this.loadProductos();

  }


  loadProductos(): void {
    this.productosService.getProductos().subscribe({


      next: data => {

        this.producto = data;
        console.log(data);
      }
    })


  }

 
  abrirModal(modal: any, producto?: any): void {
    this.isEditMode = !!producto;
    this.tituloModal = this.isEditMode ? 'Editar Cliente' : 'Agregar Nuevo Cliente';
    this.selectedProdcutos = producto;

    if (this.isEditMode) {
      this.productoForm.patchValue(producto);
    } else {
      this.productoForm.reset();
    }

    this.modalService.open(modal, {
      centered: true,
     
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      // Marca todos los campos como touched para mostrar errores
      Object.values(this.productoForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const productoData: Productos = this.productoForm.value;
    if (this.isEditMode) {
      this.productosService.updateProductos(productoData).subscribe({
        next: (updateProductos) => {
          const index = this.producto.findIndex(c => c.id === this.selectedProdcutos?.id);
          if (index !== -1) {
            this.producto[index] = updateProductos;
          }
          Swal.fire({
            title: "Productos " + updateProductos.nombre + " actualizado",
            text: "El cliente fue actualizado exitosamente",
            icon: "success"
          });
          this.modalService.dismissAll();
          this.productoForm.reset();
        },
        error: error => {
          this.mostrarErrores(error);
        }
      });
    } else {
      this.productosService.createProductos(productoData).subscribe({
        next: (newCliente) => {
          this.producto.push(newCliente);
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
      this.productoForm.reset();
    }

    this.modalService.dismissAll();
  }

  editProductos(producto: Productos): void {
    this.isEditMode = true;
    this.selectedProdcutos = producto;
    this.tituloModal = 'Editar Producto';
    this.productoForm.patchValue({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      
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



  deleteProductos(idProductos: number) {
    Swal.fire({
      title: "Eliminar productos",
      text: "Esta seguro que deseas eliminar el producto",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.isConfirmed) {
        this.productosService.deleteProductos(idProductos).subscribe({
          next: (deleteteProducto) => {

            this.producto = this.producto.filter(a => a.id !== idProductos);
            Swal.fire({
              title: "Producto Eliminado",
              text: "El producto fue eliminado exitosamnete",
              icon: "success"
            });

          },
          error: (error) => {
            this.mostrarErrores(error);

          }
        })
      }

    })
  }


}



