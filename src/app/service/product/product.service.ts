import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  //GET pass
  async getProducts() {
    try {
      const response = await this.http
        .get<Product[]>('http://localhost:5148/api/Product?id=')
        .toPromise();
      return response;
    } catch (error) {
      console.log('getProduct: ', error);
      return null;
    }
  }

  //GET pass
  async getProductsById(id: string) {
    try {
      const response = await this.http
        .get<Product>('http://localhost:5148/api/Product?id=' + id)
        .toPromise();
      return response;
    } catch (error) {
      console.log('getProduct: ', error);
      return null;
    }
  }

  //POST pass
  insertProduct(products: Product) {
    try {
      console.log('this is product: ', products);
      let response = this.http
        .post<Product[]>(this.url, products, { headers: this.headers })
        .toPromise();
      return response;
    } catch (error) {
      console.error('insertProduct: ', error);
      return null;
    }
  }

  //DELETE pass
  async deleteProduct(id: any) {
    try {
      await this.http
        .delete<Product[]>(`http://localhost:5148/api/Product?id=${id}`)
        .toPromise();
    } catch (error) {
      console.log('deleteProduct: ', error);
    }
  }

  //Put pass
  updateProduct(products: Product) {
    try {
      this.http
        .put<Product[]>(this.url, products, { headers: this.headers })
        .toPromise();
    } catch (error) {
      console.log('updateProduct: ', error);
    }
  }

  //--------------------- V2 --------------------------
  //Search pass
  getSearchV2(text: string): Observable<any> {
    return this.http.get<Product[]>(
      `http://localhost:5148/api/Product/search?search=${text}`
    );
  }
  //GET ALL pass
  getProductsV2(): Observable<any> {
    return this.http.get<Product[]>('http://localhost:5148/api/Product?id=');
  }
  //GET pass
  getProductsByIdV2(id: string): Observable<any> {
    return this.http.get<Product[]>(
      'http://localhost:5148/api/Product?id=' + id
    );
  }
  //GET Put pass
  updateProductV2(products: Product): Observable<any> {
    return this.http
    .put<Product[]>("http://localhost:5148/api/Product", products, { headers: this.headers });
  }
}
