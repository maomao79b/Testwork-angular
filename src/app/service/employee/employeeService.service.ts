import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/model/model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  constructor(private http: HttpClient) {}

  //GET
  async getEmployees() {
    try {
      const response = await this.http
        .get<Employee[]>('http://localhost:5148/api/Employee')
        .toPromise();
      return response;
    } catch (error) {
      console.log('getEmployees: ', error);
      return null;
    }
  }

  //DELETE
  async deleteEmployee(id: any) {
    try {
      await this.http
        .delete<Employee[]>('http://localhost:5148/api/Employee?id=' + id)
        .toPromise();
    } catch (error) {
      console.log('deleteEmployee: ', error);
    }
  }

  //Put
  async updateEmployee(
    id: any,
    name: any,
    age: any,
    address: any,
    phone: any,
    username: any,
    password: any,
    position: any
  ) {
    try {
      await this.http
        .put<Employee[]>(
          `http://localhost:5148/api/Employee?id=${id}&name=${name}&age=${age}&address=${address}&phone=${phone}&username=${username}&password=${password}&position=${position}`,
          {}
        )
        .toPromise();
    } catch (error) {
      console.log('updataeEmployee: ', error);
    }
  }

  //Post
  async insertEmployee(
    name: any,
    age: any,
    address: any,
    phone: any,
    username: any,
    password: any,
    position: any
  ) {
    try {
      await this.http
        .post<Employee[]>(
          `http://localhost:5148/api/Employee?name=${name}&age=${age}&address=${address}&phone=${phone}&username=${username}&password=${password}&position=${position}`,
          {}
        )
        .toPromise();
    } catch (error) {
      console.log('updataeEmployee: ', error);
    }
  }

  //GET
  async getLogin(username: string, password: string) {
    try {
      const response = await this.http
        .get<Employee[]>(
          `http://localhost:5148/api/Employee/login?username=${username}&password=${password}`
        )
        .toPromise();
      return response;
    } catch (error) {
      console.log('getEmployees: ', error);
      return null;
    }
  }
}
