import { Injectable } from '@angular/core';
import { AcceptProduct, UpdateStatusAccept } from 'src/app/model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment, Token } from 'src/app/config/global';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AcceptProductService {
  baseUrl: string = Environment.AcceptProducts;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${this.cookieService.get(Token)}`
  });
  headers2: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json-patch+json',
    'Authorization' : `Bearer ${this.cookieService.get(Token)}`
  });

  statusPath: string = '/status';
  confirm: string = '/confirm';
  search: string = '/search/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  //GET ALL
  async getAcceptProductsConfirm() {
    let url: string = this.baseUrl + this.confirm;
    try {
      const response = await this.http.get<AcceptProduct[]>(url, {headers : this.headers}).toPromise();
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
        .get<AcceptProduct[]>(this.baseUrl, {headers : this.headers})
        .toPromise();
      return response;
    } catch (error) {
      console.log('getAcceptProducts: ', error);
      return null;
    }
  }

  //DELETE
  async deleteAcceptProduct(id: any) {
    let url: string = this.baseUrl + '/' + id;
    try {
      await this.http.delete<AcceptProduct[]>(url, {headers : this.headers}).toPromise();
    } catch (error) {
      console.log('deleteAcceptProduct: ', error);
    }
  }

  //POST
  async insertAcceptProduct(acceptProduct: AcceptProduct) {
    try {
      await this.http
        .post<AcceptProduct[]>(this.baseUrl, acceptProduct, {
          headers: this.headers,
        })
        .toPromise();
    } catch (error) {
      alert(error);
    }
  }

  //PUT
  async updateStatus(id: any, update: UpdateStatusAccept) {
    try {
      let urlPath = this.baseUrl + this.statusPath + '/' + id;
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
  //GET ALL
  getAcceptProductsV2(): Observable<any> {
    return this.http.get<AcceptProduct[]>(this.baseUrl, {headers : this.headers});
  }
  //GET By ID
  getAcceptProductsByIdV2(id: string): Observable<any> {
    let url = this.baseUrl + '/' + id;
    return this.http.get<AcceptProduct[]>(url, {headers : this.headers});
  }
  //GET ALL Confirm
  getAcceptProductsConfirmV2(): Observable<any> {
    let url: string = this.baseUrl + this.confirm;
    return this.http.get<AcceptProduct[]>(url, {headers : this.headers});
  }
  //Search Accept
  getAcceptProductsSearchV2(text: string): Observable<any> {
    let url: string = this.baseUrl + this.search + text;
    return this.http.get<AcceptProduct[]>(url, {headers : this.headers});
  }
  //Search Pack
  getPackProductSearchV2(text: string): Observable<any> {
    let url: string = this.baseUrl + this.search + text;
    return this.http.get<AcceptProduct[]>(
      url, {headers : this.headers}
    );
  }
  //UpdateProduct
  updateProductV2(id:any, products: AcceptProduct): Observable<any> {
    return this.http.put<AcceptProduct[]>(this.baseUrl + '/' + id, products, {headers : this.headers});
  }
}
