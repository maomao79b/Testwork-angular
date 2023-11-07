import { Injectable } from '@angular/core';
import { Customer } from 'src/app/model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from 'src/app/config/global';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  baseUrl: string = Environment.Customers;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  //GET
  async getCustomers() {
    // ถ้าไม่ส่ง id และ name จะเป็นการ getAll
    try {
      const response = await this.http
        .get<Customer[]>(
          this.baseUrl
        )
        .toPromise();
      return response;
    } catch (error) {
      console.log('getCustomers: ', error);
      return null;
    }
  }

  //DELETE
  async deleteCustomer(id: any) {
    try {
      await this.http
        .delete<Customer[]>(this.baseUrl + '/' + id)
        .toPromise();
    } catch (error) {
      console.log('deleteCustomer: ', error);
    }
  }

  //PUT
  async updateCustomer(id: any, customers: Customer) {
    try {
      await this.http
        .put<Customer[]>(this.baseUrl + '/' + id, customers)
        .toPromise();
    } catch (error) {
      console.error('updateCustomer: ', error);
    }
  }

  //POST
  async insertCustomer(customers: Customer) {
    try {
      await this.http
        .post<Customer[]>(this.baseUrl, customers)
        .toPromise();
    } catch (error) {
      console.error('insertCustomer: ', error);
    }
  }

  // ---------------------------------------- Version 2 -------------------------------------
  //GET
  getCustomerV2(): Observable<any> {
    return this.http.get<Customer[]>(this.baseUrl);
  }
  //GET
  getSearchV2(text: string): Observable<any> {
    return this.http.get<Customer[]>(this.baseUrl + '/search/' + text);
  }
  //GET
  getCheckCustomerdataV2(text: string): Observable<any> {
    return this.http.get<Customer[]>(this.baseUrl + '/checkcustomerdata/' + text);
  }

}
