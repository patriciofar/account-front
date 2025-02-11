import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http: HttpClient) { }


  getAllMovimientos() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/movimientos').subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      });
    });
  }


  createMovimiento(movimiento: any) {
    return this.http.post(environment.apiUrl + '/save-movimiento', movimiento).toPromise();
  }

  updateMovimiento(movimiento: any) {
    return this.http.put(environment.apiUrl + '/update-movimiento/' + movimiento.movimientoId, movimiento).toPromise();
  }


  deleteMovimiento(movimientoId: any) {
    return this.http.delete(environment.apiUrl + '/delete-movimiento/' + movimientoId).toPromise();
  }

}
