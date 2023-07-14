import { PackProducts } from './../../model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackProductsService {
  url: string = 'http://localhost:5148/api/PackProducts';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  //GET
  public getPackProducts(){
    try {
      return this.http.get<PackProducts[]>(this.url).toPromise();
    } catch (error) {
      alert(error);
    }
  }
  //POST
  insertPackProducts(packProducts: PackProducts){
    try {
      return this.http.post(this.url, packProducts, {headers: this.headers}).toPromise();
    } catch (error) {
      alert(error);
    }
  }
  //DELETE
  deletePackProducts(id: number){
    try {
      this.http.delete(this.url+"?id="+id.toString()).toPromise();
    } catch (error) {
      alert(error);
    }
  }
  //UPDATE
  updatePackProducts(packProducts: PackProducts){
    try {
      this.http.put(this.url, packProducts, {headers: this.headers}).toPromise();
    } catch (error) {
      alert(error);
    }
  }

}
