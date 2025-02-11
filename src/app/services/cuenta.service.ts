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

}
