import { Cliente } from "./cliente.model";
import { Cuenta } from "./cuenta.model";

export interface Movimiento {
    movimientoId?: string,
    fecha?: string,
    tipoMovimiento?: string,
    valor?: number,
    saldo?: number,
    estado?: boolean,
    cuenta?: Cuenta
}