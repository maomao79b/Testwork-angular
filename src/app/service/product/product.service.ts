import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  //POST
  insertProduct(
    name: string,
    description: string,
    price: string,
    image: string
  ) {
    try {
      this.http
        .post<Product[]>(`http://localhost:5148/api/Product?name=${name}&description=${description}&price=${price}&image=${image}`,{})
        .subscribe();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูลสินค้า:', error);
    }
  }
}
