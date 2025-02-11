import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cuenta } from 'src/app/model/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent {
  listaCuentas: Cuenta[] = [];
  isShowModal = false;
  selectedCuenta: Cuenta = {};
  initListaCuentas: Cuenta[] = [];
  buscarCuenta = '';

  constructor(public router: Router,
    private cuentaService: CuentaService
  ) {
  }

  ngOnInit(): void {
    this.getAllCuentas();
  }

  showModalUpdate(cuenta: any) {
    this.router.navigate(['/cuenta/generate'], {
      state: {
        response: { data: { cuenta } },
      },
    });
  }

  showModalDelete(cuenta: any) {
    console.log(cuenta);
    this.selectedCuenta = cuenta;
    this.isShowModal = true;
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
}
