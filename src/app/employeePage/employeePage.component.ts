import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/model';
import { EmployeeServiceService } from '../service/employee/employeeService.service';


@Component({
  selector: 'app-employeePage',
  templateUrl: './employeePage.component.html',
  styleUrls: ['./employeePage.component.css']
})
export class EmployeePageComponent implements OnInit {

  employeeList: Employee[] = [];
  employeeFilter: Employee[] = [];
  constructor(private service: EmployeeServiceService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.service.getEmployees();
    this.employeeList = await <Employee[]>response;
    console.log(response);
    this.employeeFilter = await this.employeeList;
  }

  searchText: string = "";

  search(): void {
    this.employeeFilter = this.employeeList.filter(employee => {
      console.log(this.searchText);
      return employee.id.toString().toLocaleLowerCase().includes(this.searchText.toLowerCase()) ||
      employee.name.toLocaleLowerCase().includes(this.searchText.toLowerCase()) ||
      employee.email.toLocaleLowerCase().includes(this.searchText.toLowerCase());
    })
  }



}
