import { Login } from './../../model/model';

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/model/model';
import { Observable } from 'rxjs';
import { Environment} from 'src/app/config/global';
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

  //Put
  async updateEmployee(
    id: any,
    employee: Employee
  ) {
    try {
      await this.http
        .put<Employee[]>(
          this.baseUrl + '/' + id, employee
        )
        .toPromise();
    } catch (error) {
      console.log('updataeEmployee: ', error);
    }
  }

  //Post
  async insertEmployee(
    newEmployee: Employee
  ) {
    try {
      await this.http
        .post<Employee[]>(
          this.baseUrl,newEmployee
        )
        .toPromise();
    } catch (error) {
      console.log('updataeEmployee: ', error);
    }
  }

  //POST
  getLogin(login: Login): Observable<any> {
    return this.http
    .post<Employee[]>(this.baseUrl+'/login', login, { headers: this.headers});
  }

// ---------------------------------------- Version 2 -------------------------------------
//GET
getEmployeesV2(): Observable<any> {
  return this.http
  .get<Employee[]>(this.baseUrl);
}
//GET
getImageEmployeesV2Byid(id: any): Observable<any> {
  return this.http
  .get<Employee[]>(this.baseUrl + '/' + id);
}
//SEARCH
getSearchV2(text: string): Observable<any> {
  return this.http
  .get<Employee[]>(this.baseUrl + '/search/' + text);
}

}
