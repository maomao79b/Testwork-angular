import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleHistory } from 'src/app/model/model';

@Injectable({
  providedIn: 'root'
})
export class SaleHistoryService {

  url: string = 'http://localhost:5148/api/SaleHistory';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

constructor(private http: HttpClient) { }

//POST
insertProduct111(saleHistory: SaleHistory) {
 try {
   console.log("this is saleHistory: ", saleHistory);
   let response = this.http.post<SaleHistory[]>(this.url, saleHistory,{headers : this.headers}).toPromise();
   return response;
 } catch (error) {
   console.error('insertsaleHistory: ', error);
   return null;
 }
}
// ----------------------------- V2 -------------------------------------------
//POST
insertProduct(saleHistory: SaleHistory): Observable<any> {
  return this.http.post<SaleHistory[]>(this.url, saleHistory, { headers: this.headers });
}
// GET ALL
getHistory():Observable<any>{
  return this.http.get<SaleHistory[]>(this.url);
}
// GET BY ID
getHistoryByid(id: any):Observable<any>{
  return this.http.get<SaleHistory[]>(this.url+'/id?id='+id);
}

}
