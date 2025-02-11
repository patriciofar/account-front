import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movimiento } from 'src/app/model/movimiento.model';
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

  constructor(public router: Router,
    private movimientoService: MovimientoService
  ) {
  }

  ngOnInit(): void {
    this.getAllMovimientos();
  }

  
  showModalUpdate(cuenta: any) {
    this.router.navigate(['/cuenta/generate'], {
      state: {
        response: { data: { cuenta } },
      },
    });
  }

  showModalDelete(movimiento: any) {
    console.log(movimiento);
    this.selectedMovimiento = movimiento;
    this.isShowModal = true;
  }

  filterMovimientos() {
    this.listaMovimientos = this.initListaMovimientos.filter((item: any) => {
      const clienteNombre = item.cuenta?.cliente?.nombre?.toLowerCase();
      return Object.values(item)
        .some((value: any) => {
          if (clienteNombre && clienteNombre.includes(this.buscarMovimiento.toLowerCase())) {
            return true;
          }
          return value && value.toString().toLowerCase().includes(this.buscarMovimiento.toLowerCase());
        });
    });
  }

  //presenter

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
