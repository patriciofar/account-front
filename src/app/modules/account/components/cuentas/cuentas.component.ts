import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente.model';
import { Cuenta } from 'src/app/model/cuenta.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent {
  listaCuentas: Cuenta[] = [];
  isShowModal = false;
  selectedCuenta: Cuenta = {cliente: {} as Cliente };
  initListaCuentas: Cuenta[] = [];
  buscarCuenta = '';
  title = '';
  isShowModalDeleted = false;
  listaClientes: Cliente[] = [];
  selectedCliente: Cliente = {};

  constructor(public router: Router,
    private cuentaService: CuentaService,
    private clienteService: ClienteService
  ) {
  }

  ngOnInit(): void {
    this.getAllCuentas();
    this.getAllClientes();
  }

  showModalDelete(cuenta: any) {
    this.selectedCuenta = cuenta;
    this.isShowModalDeleted = true;
  }

  showModalCreate() {
    this.selectedCuenta = {};
    this.title = 'Crear cuenta';
    this.isShowModal = true;
  }

  showModalUpdate(cuenta: Cuenta) {
    this.selectedCuenta = {
      cuentaId: cuenta.cuentaId,
      numeroCuenta: cuenta.numeroCuenta,
      tipoCuenta: cuenta.tipoCuenta,
      saldoInicial: cuenta.saldoInicial,
      estado: cuenta.estado,
      cliente: cuenta.cliente
    };
    this.title = 'Editar cuenta';
    this.isShowModal = true;
  }

  closeModalCuenta() {
    this.isShowModal = false;
  }

  closeModalDelete() {
    this.isShowModalDeleted = false;
  }


  confirmDeleteCuenta() {
    this.cuentaService.deleteCuenta(this.selectedCuenta.cuentaId).then(() => {
      this.listaCuentas = this.listaCuentas.filter(cuenta => cuenta.cuentaId !== this.selectedCuenta.cuentaId);
      this.closeModalDelete();
    }).catch(error => {
      console.error('Error elimienando cuenta:', error);
    });
  }

  onSubmit() {
    console.log('selectedCliente',this.selectedCliente);
    this.selectedCuenta.cliente = this.selectedCliente;
    if (this.selectedCuenta.cuentaId) {
      this.cuentaService.updateCuenta(this.selectedCuenta).then((response) => {
        console.log('cuenta actualizado', response);
        this.isShowModal = false;
        this.getAllCuentas();
      }).catch((error) => {
        console.error('Error al actualizar cuenta', error);
      });
    } else {
      this.cuentaService.createCuenta(this.selectedCuenta).then((response) => {
        console.log('cuenta creada', response);
        this.isShowModal = false;
        this.getAllCuentas();
      }).catch((error) => {
        console.error('Error al crear cuenta', error);
      });
    }
  }



  filterCuentas() {
    this.listaCuentas = this.initListaCuentas.filter((item: any) => {
      return Object.values(item)
        .some((value: any) => value && value.toString().toLowerCase().includes(this.buscarCuenta.toLowerCase()));
    });
  }

  //presenter

  getAllCuentas() {
    this.cuentaService.getAllCuentas().then((cuentas: any) => {
      this.listaCuentas = [];
      cuentas.forEach((cuenta: any) => {
        this.listaCuentas.push({
          cuentaId: cuenta.cuentaId,
          numeroCuenta: cuenta.numeroCuenta,
          tipoCuenta: cuenta.tipoCuenta,
          saldoInicial: cuenta.saldoInicial,
          estado: cuenta.estado,
          cliente: cuenta.cliente,
        });
      });
      this.initListaCuentas = this.listaCuentas;
    });
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
    });
  }
}
