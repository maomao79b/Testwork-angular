import { Login } from './../../model/model';

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/model/model';
import { Observable } from 'rxjs';
import { Environment, Token} from 'src/app/config/global';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {

  baseUrl: string = Environment.Employees;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${this.cookieService.get(Token)}`
  });
  // 'Authorization' : this.tokenService.getToken()

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  //GET
  async getEmployees() {
    try {
      const response = await this.http
        .get<Employee[]>(this.baseUrl, {headers : this.headers})
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
        .delete<Employee[]>(this.baseUrl+ '/' + id, {headers : this.headers})
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
          this.baseUrl + '/' + id, employee, {headers : this.headers}
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
          this.baseUrl,newEmployee, {headers : this.headers}
        )
        .toPromise();
    } catch (error) {
      console.log('updataeEmployee: ', error);
    }
  }

  //POST get token
  getLogin(login: Login): Observable<any> {
    return this.http
    .post<Employee[]>(this.baseUrl+'/authenticate', login);
  }

// ---------------------------------------- Version 2 -------------------------------------
//GET
getEmployeesV2(): Observable<any> {
  return this.http
  .get<Employee[]>(this.baseUrl, {headers : this.headers});
}
//GET
getImageEmployeesV2Byid(id: any): Observable<any> {
  return this.http
  .get<Employee[]>(this.baseUrl + '/' + id, {headers : this.headers});
}
//SEARCH
getSearchV2(text: string): Observable<any> {
  return this.http
  .get<Employee[]>(this.baseUrl + '/search/' + text, {headers : this.headers});
}

}
