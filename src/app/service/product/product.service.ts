import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:5148/api/Product';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

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
  insertProduct(products: Product) {
    try {
      console.log("this is product: ", products);
      let response = this.http.post<Product[]>(this.url, products,{headers : this.headers}).toPromise();
      return response;
    } catch (error) {
      console.error('insertProduct: ', error);
      return null;
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
  updateProduct(products: Product) {
    try {
      this.http
        .put<Product[]>(this.url, products, {headers : this.headers}).toPromise();
    } catch (error) {
      console.log('updateProduct: ', error);
    }
  }
}
