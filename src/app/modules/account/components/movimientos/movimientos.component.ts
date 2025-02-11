import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente.model';
import { Cuenta } from 'src/app/model/cuenta.model';
import { Movimiento } from 'src/app/model/movimiento.model';
import { CuentaService } from 'src/app/services/cuenta.service';
import { MovimientoService } from 'src/app/services/movimiento.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent {
 listaMovimientos: Movimiento[] = [];
  isShowModal = false;
  selectedMovimiento: Movimiento = {};
  initListaMovimientos: Movimiento[] = [];
  buscarMovimiento = '';
  title = '';
  isShowModalDeleted = false;
  selectedCuenta: Cuenta = {cliente: {} as Cliente };
  listaCuentas: Cuenta[] = [];

  constructor(public router: Router,
    private movimientoService: MovimientoService,
    private cuentaService: CuentaService,
  ) {
  }

  ngOnInit(): void {
    this.getAllMovimientos();
    this.getAllCuentas();
  }

  showModalDelete(movimiento: any) {
    this.selectedMovimiento = movimiento;
    this.isShowModalDeleted = true;
  }
  confirmDeleteMovimiento() {
    this.movimientoService.deleteMovimiento(this.selectedMovimiento.movimientoId).then(() => {
      this.listaMovimientos = this.listaMovimientos.filter(movimiento => movimiento.movimientoId !== this.selectedMovimiento.movimientoId);
      this.closeModalDelete();
    }).catch(error => {
      console.error('Error elimienando movimiento:', error);
    });
  }

  filterMovimientos() {
    this.listaMovimientos = this.initListaMovimientos.filter((item: any) => {
      return Object.values(item)
        .some((value: any) => value && value.toString().toLowerCase().includes(this.buscarMovimiento.toLowerCase()));
    });
  }

  showModalCreate() {
    this.selectedMovimiento = {};
    this.title = 'Crear Movimiento';
    this.isShowModal = true;
  }

  showModalUpdate(movimiento: Movimiento) {
    this.selectedMovimiento = {
      movimientoId: movimiento.movimientoId,
      fecha: movimiento.fecha,
      tipoMovimiento: movimiento.tipoMovimiento,
      valor: movimiento.valor,
      saldo: movimiento.saldo,
      cuenta: movimiento.cuenta,
    };
    this.title = 'Editar movimiento';
    this.isShowModal = true;
  }

  closeModalMovimiento() {
    this.isShowModal = false;
  }

  closeModalDelete() {
    this.isShowModalDeleted = false;
  }
  
  onSubmit() {
    this.selectedMovimiento.cuenta = this.selectedCuenta;
    if (this.selectedMovimiento.movimientoId) {
      this.movimientoService.updateMovimiento(this.selectedMovimiento).then((response) => {
        console.log('Movimiento actualizado', response);
        this.isShowModal = false;
        this.getAllMovimientos();
        this.getAllCuentas();
      }).catch((error) => {
        console.error('Error al actualizar movimiento', error);
      });
    } else {
      this.movimientoService.createMovimiento(this.selectedMovimiento).then((response) => {
        console.log('Movimiento creado', response);
        this.isShowModal = false;
        this.getAllMovimientos();
        this.getAllCuentas();
      }).catch((error) => {
        console.error('Error al crear movimiento', error);
      });
    }
  }

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
    });
  }


  //presenter
  deleteMovimiento(movimientoId: any) {
    this.movimientoService.deleteMovimiento(movimientoId).then((response: any) => {
      console.log(response);
    });
    this.closeModalDelete();
    this.getAllMovimientos();
  }

  getAllMovimientos() {
    this.movimientoService.getAllMovimientos().then((movimientos: any) => {
      this.listaMovimientos = [];
      movimientos.forEach((movimiento: any) => {
        this.listaMovimientos.push({
          movimientoId: movimiento.movimientoId,
          fecha: movimiento.fecha,
          tipoMovimiento: movimiento.tipoMovimiento,
          valor: movimiento.valor,
          saldo: movimiento.saldo,
          cuenta: movimiento.cuenta,
        });
      });
      this.initListaMovimientos = this.listaMovimientos;
    });
  }
}
