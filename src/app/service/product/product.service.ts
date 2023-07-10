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
    brand: string,
    model: string,
    description: string,
    price: string,
    image: string
  ) {
    try {
      this.http
        .post<Product[]>(`http://localhost:5148/api/Product?brand=${brand}&model=${model}&description=${description}&price=${price}&image=${image}`,{})
        .subscribe();
    } catch (error) {
      console.error('insertProduct: ', error);
    }
  }

}
