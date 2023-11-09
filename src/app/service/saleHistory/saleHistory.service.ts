import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Environment, Token } from 'src/app/config/global';
import { SaleHistory } from 'src/app/model/model';

@Injectable({
  providedIn: 'root',
})
export class SaleHistoryService {
  baseUrl: string = Environment.SaleHistories;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.cookieService.get(Token)}`,
  });

  search: string = '/search/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  //POST
  insertProduct111(saleHistory: SaleHistory) {
    try {
      console.log('this is saleHistory: ', saleHistory);
      let response = this.http
        .post<SaleHistory[]>(this.baseUrl, saleHistory, {
          headers: this.headers,
        })
        .toPromise();
      return response;
    } catch (error) {
      console.error('insertsaleHistory: ', error);
      return null;
    }
  }
  // ----------------------------- V2 -------------------------------------------
  //POST
  insertProduct(saleHistory: SaleHistory): Observable<any> {
    return this.http.post<SaleHistory[]>(this.baseUrl, saleHistory, {
      headers: this.headers,
    });
  }
  // GET ALL
  getHistory(): Observable<any> {
    return this.http.get<SaleHistory[]>(this.baseUrl, {headers : this.headers});
  }
  // GET BY ID
  getHistoryByid(id: any): Observable<any> {
    let url: string = this.baseUrl + '/' + id;
    return this.http.get<SaleHistory[]>(url, {headers : this.headers});
  }
}
