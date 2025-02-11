import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  listaClientes: Cliente[] = [];
  isShowModal = false;
  selectedCliente: Cliente = {};
  initListaClientes: Cliente[] = [];
  buscarCliente = '';
  title = '';
  isShowModalDeleted = false;
  constructor(public router: Router,
    private clienteService: ClienteService
  ) {
  }

  ngOnInit(): void {
    this.getAllClientes();
  }


  showModalDelete(cliente: any) {
    this.selectedCliente = cliente;
    this.isShowModalDeleted = true;
  }
  confirmDeleteCliente() {
    this.clienteService.deleteCliente(this.selectedCliente.clienteId).then(() => {
      this.listaClientes = this.listaClientes.filter(cliente => cliente.clienteId !== this.selectedCliente.clienteId);
      this.closeModalDelete();
    }).catch(error => {
      console.error('Error elimienando cliente:', error);
    });
  }

  filterClientes() {
    this.listaClientes = this.initListaClientes.filter((item: any) => {
      return Object.values(item)
        .some((value: any) => value && value.toString().toLowerCase().includes(this.buscarCliente.toLowerCase()));
    });
  }

  showModalCreate() {
    this.selectedCliente = {};
    this.title = 'Crear Cliente';
    this.isShowModal = true;
  }

  showModalUpdate(cliente: Cliente) {
    this.selectedCliente = {
      clienteId: cliente.clienteId,
      contrasena: cliente.contrasena,
      estado: cliente.estado,
      nombre: cliente.nombre,
      genero: cliente.genero,
      edad: cliente.edad,
      identificacion: cliente.identificacion,
      direccion: cliente.direccion,
      telefono: cliente.telefono
    };
    this.title = 'Editar Cliente';
    this.isShowModal = true;
  }

  closeModalCliente() {
    this.isShowModal = false;
  }

  closeModalDelete() {
    this.isShowModalDeleted = false;
  }

  onSubmit() {
    if (this.selectedCliente.clienteId) {
      this.clienteService.updateCliente(this.selectedCliente).then((response) => {
        console.log('Cliente actualizado', response);
        this.isShowModal = false;
        this.getAllClientes();
      }).catch((error) => {
        console.error('Error al actualizar cliente', error);
      });
    } else {
      this.clienteService.createCliente(this.selectedCliente).then((response) => {
        console.log('Cliente creado', response);
        this.isShowModal = false;
        this.getAllClientes();
      }).catch((error) => {
        console.error('Error al crear cliente', error);
      });
    }
  }


  // PRESENTER

  deleteCliente(clienteId: any) {
    this.clienteService.deleteCliente(clienteId).then((response: any) => {
      console.log(response);
    });
    this.closeModalDelete();
    this.getAllClientes();
  }

  getAllClientes() {
    this.clienteService.getAllClientes().then((clientes: any) => {
      this.listaClientes = [];
      clientes.forEach((cliente: any) => {
        this.listaClientes.push({
                clienteId: cliente.clienteId,
                contrasena: cliente.contrasena,
                estado: cliente.estado,
                nombre: cliente.nombre,
                genero: cliente.genero,
                edad: cliente.edad,
                identificacion: cliente.identificacion,
                direccion: cliente.direccion,
                telefono: cliente.telefono
        });
      });
      this.initListaClientes = this.listaClientes;
    });
  }


}
