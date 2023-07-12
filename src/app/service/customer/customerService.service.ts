import { Injectable } from '@angular/core';
import { Customer } from 'src/app/model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {

  url: string = "http://localhost:5148/api/Customer";
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  //GET
  async getCustomers(id: string, name: string) { // ถ้าไม่ส่ง id และ name จะเป็นการ getAll
    try {
      const response = await this.http
        .get<Customer[]>(`http://localhost:5148/api/Customer?id=${id}&name=${name}`,{})
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
        .delete<Customer[]>('http://localhost:5148/api/Customer?id=' + id)
        .toPromise();
    } catch (error) {
      console.log('deleteCustomer: ', error);
    }
  }

  //PUT
  async updateCustomer(customers: Customer) {
    try {
      await this.http
        .put<Customer[]>(this.url, customers, {headers: this.headers}).toPromise();
    } catch (error) {
      console.error('updateCustomer: ', error);
    }
  }

  //POST
  async insertCustomer(customers: Customer) {
    try {
      await this.http
        .post<Customer[]>(this.url, customers, {headers: this.headers}).toPromise();
    } catch (error) {
      console.error('insertCustomer: ', error);
    }
  }
}
