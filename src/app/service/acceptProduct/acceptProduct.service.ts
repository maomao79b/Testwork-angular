import { Injectable } from '@angular/core';
import { AcceptProduct, UpdateStatusAccept } from 'src/app/model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AcceptProductService {
  url: string = 'http://localhost:5148/api/AcceptProduct';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  headers2: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json-patch+json',
  });
  statusPath: string = '/status';
  constructor(private http: HttpClient) {}

  //GET ALL pass
  async getAcceptProductsConfirm() {
    try {
      const response = await this.http
        .get<AcceptProduct[]>(
          'http://localhost:5148/api/AcceptProduct/confirmPage'
        )
        .toPromise();
      return response;
    } catch (error) {
      console.log('getAcceptProducts: ', error);
      return null;
    }
  }
  //GET ALL pass
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

  //DELETE pass
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

  //POST pass
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

  //PUT pass
  async updateStatus(update: UpdateStatusAccept) {
    try {
      let urlPath = this.url + this.statusPath;
      console.log(urlPath);
      let response = await this.http
        .put(urlPath, update, { headers: this.headers })
        .toPromise();
      console.log(response);
    } catch (error) {
      alert(error);
    }
  }

  //---------------------------- V2 -------------------------
  //GET ALL pass
  getAcceptProductsV2(): Observable<any> {
    return this.http.get<AcceptProduct[]>(
      `http://localhost:5148/api/AcceptProduct`
    );
  }
  //GET By ID pass
  getAcceptProductsByIdV2(id: string): Observable<any> {
    return this.http.get<AcceptProduct[]>(
      `http://localhost:5148/api/AcceptProduct/id?id=` + id
    );
  }
  //GET ALL Confirm pass
  getAcceptProductsConfirmV2(): Observable<any> {
    return this.http.get<AcceptProduct[]>(
      'http://localhost:5148/api/AcceptProduct/confirmPage'
    );
  }
  //Search Accept pass
  getAcceptProductsSearchV2(text: string): Observable<any> {
    return this.http.get<AcceptProduct[]>(
      `http://localhost:5148/api/AcceptProduct/search?search=${text}`
    );
  }
  //Search Pack pass
  getPackProductSearchV2(text: string): Observable<any> {
    return this.http.get<AcceptProduct[]>(
      `http://localhost:5148/api/PackProducts/search?search=${text}`
    );
  }
  //UpdateProduct pass
  updateProductV2(products: AcceptProduct): Observable<any> {
    return this.http.put<AcceptProduct[]>(this.url, products, {
      headers: this.headers,
    });
  }
}
