import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [{
            path: 'clientes',
            component: ClientesComponent
        },
        {
            path: 'cuentas',
            component: CuentasComponent
        },
        {
            path: 'movimientos',
            component: MovimientosComponent
        },
        {
            path: 'reportes',
            component: ReportesComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
