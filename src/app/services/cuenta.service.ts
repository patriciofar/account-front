import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
constructor(private http: HttpClient) { }

  
  getAllCuentas() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/cuentas').subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      });
    });
  }

  
  createCuenta(cuenta: any) {
    return this.http.post(environment.apiUrl + '/save-cuenta', cuenta).toPromise();
  }

  updateCuenta(cuenta: any) {
    return this.http.put(environment.apiUrl + '/update-cuenta/' + cuenta.cuentaId, cuenta).toPromise();
  }


  deleteCuenta(cuentaId: any) {
    return this.http.delete(environment.apiUrl + '/delete-cuenta/' + cuentaId).toPromise();
  }

}
