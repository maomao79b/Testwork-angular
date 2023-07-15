import { Injectable } from '@angular/core';
import { AcceptProduct, UpdateStatusAccept } from 'src/app/model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AcceptProductService {
  url: string = 'http://localhost:5148/api/AcceptProduct';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  statusPath: string = "/status";
  constructor(private http: HttpClient) {}

  //GET ALL

  async getAcceptProductsConfirm() {
    try {
      const response = await this.http
        .get<AcceptProduct[]>('http://localhost:5148/api/AcceptProduct/confirmPage')
        .toPromise();
      return response;
    } catch (error) {
      console.log('getAcceptProducts: ', error);
      return null;
    }
  }
  //GET ALL
  async getAcceptProducts() {
    try {
      const response = await this.http
        .get<AcceptProduct[]>('http://localhost:5148/api/AcceptProduct')
        .toPromise();
      return response;
    } catch (error) {
      console.log('getAcceptProducts: ', error);
      return null;
    }
  }

  //DELETE
  async deleteAcceptProduct(id: any) {
    try {
      await this.http
        .delete<AcceptProduct[]>(
          'http://localhost:5148/api/AcceptProduct?id=' + id
        )
        .toPromise();
    } catch (error) {
      console.log('deleteAcceptProduct: ', error);
    }
  }

  //POST
  async insertAcceptProduct(acceptProduct: AcceptProduct) {
    try {
      await this.http
        .post<AcceptProduct[]>(this.url, acceptProduct, {
          headers: this.headers,
        })
        .toPromise();
    } catch (error) {
      alert(error);
    }
  }

  async updateStatus(update: UpdateStatusAccept){
    try {
      let urlPath = this.url+this.statusPath;
      console.log(urlPath);
      let response = await this.http.put(urlPath, update, {headers: this.headers}).toPromise();
      console.log(response);
    } catch (error) {
      alert(error);
    }
  }
}
