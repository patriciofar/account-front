import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AccountRoutingModule } from './account-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { ReportesComponent } from './components/reportes/reportes.component';


@NgModule({
  declarations: [
    AccountComponent,
    ClientesComponent,
    CuentasComponent,
    MovimientosComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AccountModule { }
