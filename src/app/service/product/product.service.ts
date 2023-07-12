import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  //GET
  async getProducts() {
    try {
      const response = await this.http
        .get<Product[]>('http://localhost:5148/api/Product')
        .toPromise();
      return response;
    } catch (error) {
      console.log('getProduct: ', error);
      return null;
    }
  }

  //POST
  insertProduct(
    brand: any,
    model: any,
    description: any,
    price: any,
    image: any
  ) {
    try {
      this.http
        .post<Product[]>(
          `http://localhost:5148/api/Product?brand=${brand}&model=${model}&description=${description}&price=${price}&image=${image}`,
          {}
        ).toPromise();
    } catch (error) {
      console.error('insertProduct: ', error);
    }
  }

  //DELETE
  async deleteProduct(id: any) {
    try {
      await this.http
        .delete<Product[]>(`http://localhost:5148/api/Product?id=${id}`)
        .toPromise();
    } catch (error) {
      console.log('deleteProduct: ', error);
    }
  }

  //Put
  updateProduct(
    id: number,
    brand: string,
    model: string,
    description: string,
    price: number,
    image: string
  ) {
    try {
      this.http.put<Product[]>(
        `http://localhost:5148/api/Product?id=${id}&brand=${brand}&model=${model}&description=${description}&price=${price}&image=${image}`,
        {}
      ).toPromise();
    } catch (error) {
      console.log('updateProduct: ', error);
    }
  }
}
