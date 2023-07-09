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
  try {
    const response = await this.http.get<Employee[]>("http://localhost:5148/api/Employee").toPromise();
    return response;
  } catch (error) {
    console.log("getEmployees: ", error);
    return null;
  }
}

//DELETE
async deleteEmployee(id: any){
  try {
    await this.http
    .delete<Employee[]>('http://localhost:5148/api/Employee?id='+id)
    .toPromise();
  } catch (error) {
    console.log("deleteEmployee: ", error);
  }
}

}
