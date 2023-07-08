import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/model/model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

constructor(private http: HttpClient) { }

//GET
async getEmployees(){
  const response = await this.http.get<Employee[]>("http://localhost:5148/api/Employee").toPromise();
  return response;
}

//DELETE
async deleteEmployee(id: any){
  await this.http
    .delete<Employee[]>('http://localhost:5148/api/Employee?id='+id)
    .toPromise();
}

}
