import { Injectable } from '@angular/core';
import { AcceptProduct } from 'src/app/model/model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AcceptProductService {
  constructor(private http: HttpClient) {}

  //GET
  async getAcceptProducts() {
    const response = await this.http
      .get<AcceptProduct[]>('http://localhost:5148/api/AcceptProduct')
      .toPromise();
    return response;
  }

  //DELETE
  async deleteAcceptProduct(id: any){
    await this.http
      .delete<AcceptProduct[]>('http://localhost:5148/api/AcceptProduct?id='+id)
      .toPromise();
  }

  // //POST
  // async insertAcceptProduct(id: any){
  //   await this.http
  //     .post<AcceptProduct[]>('http://localhost:5148/api/AcceptProduct?id='+id)
  //     .toPromise();
  // }
}
