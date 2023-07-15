import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleHistory } from 'src/app/model/model';

@Injectable({
  providedIn: 'root'
})
export class SaleHistoryService {

  url: string = 'http://localhost:5148/api/Product';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

constructor(private http: HttpClient) { }

 //POST
 insertProduct(saleHistory: SaleHistory) {
  try {
    console.log("this is saleHistory: ", saleHistory);
    let response = this.http.post<SaleHistory[]>(this.url, saleHistory,{headers : this.headers}).toPromise();
    return response;
  } catch (error) {
    console.error('insertsaleHistory: ', error);
    return null;
  }
}

}
