import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  constructor(private modalService: NgbModal) {}


  abrirModal(modal: any) {
    this.modalService.open(modal, { 
      centered: true,
       
    });
  }

}
