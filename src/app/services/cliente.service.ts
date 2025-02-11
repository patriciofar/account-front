import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  
  getAllClientes() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/clientes').subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      });
    });
  }

  createCliente(cliente: any) {
    return this.http.post(environment.apiUrl + '/save-cliente', cliente).toPromise();
  }

  // Actualizar un cliente
  updateCliente(cliente: any) {
    return this.http.put(environment.apiUrl + '/update-cliente/' + cliente.clienteId, cliente).toPromise();
  }


  deleteCliente(clienteId: any) {
    return this.http.delete(environment.apiUrl + '/delete-cliente/' + clienteId).toPromise();
  }
}
