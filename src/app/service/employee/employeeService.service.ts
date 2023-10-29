import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/model/model';
import { Observable } from 'rxjs';
import { Environment, Login } from 'src/app/config/global';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {

  baseUrl: string = Environment.Employees;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  //GET
  async getEmployees() {
    try {
      const response = await this.http
        .get<Employee[]>(this.baseUrl)
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
        .delete<Employee[]>(this.baseUrl+ '/' + id)
        .toPromise();
    } catch (error) {
      console.log('deleteEmployee: ', error);
    }
  }

  //Put pass
  async updateEmployee(
    id: any,
    name: any,
    age: any,
    address: any,
    phone: any,
    username: any,
    password: any,
    position: any,
    image: any
  ) {
    try {
      await this.http
        .put<Employee[]>(
          `http://localhost:5148/api/Employee?id=${id}&name=${name}&age=${age}&address=${address}&phone=${phone}&username=${username}&password=${password}&position=${position}&image=${image}`,
          {}
        )
        .toPromise();
    } catch (error) {
      console.log('updataeEmployee: ', error);
    }
  }

  //Post pass
  async insertEmployee(
    name: any,
    age: any,
    address: any,
    phone: any,
    username: any,
    password: any,
    position: any,
    image: any
  ) {
    try {
      await this.http
        .post<Employee[]>(
          `http://localhost:5148/api/Employee?name=${name}&age=${age}&address=${address}&phone=${phone}&username=${username}&password=${password}&position=${position}&phone=${phone}&username=${username}&password=${password}&image=${image}`,
          {}
        )
        .toPromise();
    } catch (error) {
      console.log('updataeEmployee: ', error);
    }
  }

  //POST pass
  getLogin(login: Login): Observable<any> {
    return this.http
    .post<Employee[]>(this.baseUrl+'/login', login, { headers: this.headers});
  }

    // //POST pass
    // async insertCustomer(customers: Customer) {
    //   try {
    //     await this.http
    //       .post<Customer[]>(this.url, customers, { headers: this.headers })
    //       .toPromise();
    //   } catch (error) {
    //     console.error('insertCustomer: ', error);
    //   }
    // }

// ---------------------------------------- Version 2 -------------------------------------
//GET pass
getEmployeesV2(): Observable<any> {
  return this.http
  .get<Employee[]>('http://localhost:5148/api/Employee');
}
//GET pass
getImageEmployeesV2Byid(id: string): Observable<any> {
  return this.http
  .get<Employee[]>('http://localhost:5148/api/Employee/image?id='+id);
}
//SEARCH pass
getSearchV2(text: string): Observable<any> {
  return this.http
  .get<Employee[]>('http://localhost:5148/api/Employee/search?search='+text);
}

}
