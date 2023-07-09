import { Injectable } from '@angular/core';
import { Customer } from 'src/app/model/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}

  //GET
  async getCustomers() {
    try {
      const response = await this.http
        .get<Customer[]>('http://localhost:5148/api/Customer')
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
  async updateCustomer(
    id: any,
    name: any,
    age: any,
    address: any,
    phone: any,
    email: any,
    password: any
  ) {
    try {
      await this.http
        .put<Customer[]>(
          `http://localhost:5148/api/Customer?id=${id}&name=${name}&age=${age}&address=${address}&phone=${phone}&email=${email}&password=${password}`,
          {}
        )
        .subscribe();
    } catch (error) {
      console.error('updateCustomer: ', error);
    }
  }

  //POST
  async insertCustomer(
    name: any,
    age: any,
    address: any,
    phone: any,
    email: any,
    password: any
  ) {
    try {
      await this.http
        .post<Customer[]>(
          `http://localhost:5148/api/Customer?name=${name}&age=${age}&address=${address}&phone=${phone}&email=${email}&password=${password}`,
          {}
        )
        .subscribe();
    } catch (error) {
      console.error('insertCustomer: ', error);
    }
  }
}
