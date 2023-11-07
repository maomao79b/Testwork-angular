import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/app/config/global';
import { Product } from 'src/app/model/model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  baseUrl: string = Environment.Products;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  search: string = '/search/';

  //GET All
  async getProducts() {
    try {
      const response = await this.http.get<Product[]>(this.baseUrl).toPromise();
      return response;
    } catch (error) {
      console.log('getProduct: ', error);
      return null;
    }
  }

  //GET By ID
  async getProductsById(id: any) {
    let url: string = this.baseUrl + '/' + id;
    try {
      const response = await this.http.get<Product>(url).toPromise();
      return response;
    } catch (error) {
      console.log('getProduct: ', error);
      return null;
    }
  }

  //POST
  insertProduct(products: Product) {
    try {
      let response = this.http
        .post<Product[]>(this.baseUrl, products, { headers: this.headers })
        .toPromise();
      return response;
    } catch (error) {
      console.error('insertProduct: ', error);
      return null;
    }
  }

  //DELETE
  async deleteProduct(id: any) {
    let url: string = this.baseUrl + '/' + id;
    try {
      await this.http.delete<Product[]>(url).toPromise();
    } catch (error) {
      console.log('deleteProduct: ', error);
    }
  }

  //Put
  updateProduct(products: Product) {
    try {
      this.http
        .put<Product[]>(this.baseUrl, products, { headers: this.headers })
        .toPromise();
    } catch (error) {
      console.log('updateProduct: ', error);
    }
  }

  //--------------------- V2 --------------------------
  //Search
  getSearchV2(text: string): Observable<any> {
    let url: string = this.baseUrl + this.search + text;
    return this.http.get<Product[]>(url);
  }
  //GET ALL
  getProductsV2(): Observable<any> {
    return this.http.get<Product[]>(this.baseUrl);
  }
  //GET By ID
  getProductsByIdV2(id: string): Observable<any> {
    let url: string = this.baseUrl + '/' + id;
    return this.http.get<Product[]>(url);
  }
  //PUT
  updateProductV2(id:any, products: Product): Observable<any> {
    return this.http.put<Product[]>(this.baseUrl + '/' + id, products);
  }
}
