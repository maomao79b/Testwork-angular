import { Injectable } from '@angular/core';
import { Customer } from 'src/app/model/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService{

constructor(private http: HttpClient) { }

//GET
async getCustomers(){
  const response = await this.http.get<Customer[]>("http://localhost:5148/api/Customer").toPromise();
  return response;
}


}
