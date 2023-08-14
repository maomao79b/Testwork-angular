import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/model';
import { EmployeeServiceService } from '../service/employee/employeeService.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentPath } from '../config/global';

@Component({
  selector: 'app-employeePage',
  templateUrl: './employeePage.component.html',
  styleUrls: ['./employeePage.component.css'],
})
export class EmployeePageComponent implements OnInit {
  // --------------------- Attribute -------------------------
  employeeList: Employee[] = [];
  employeeFilter: Employee[] = [];

  addVisible: boolean = false;
  editVisible: boolean = false;

  searchText: string = '';

  id: number | undefined;
  name: string | undefined;
  age: number | undefined;
  address: string | undefined;
  phone: string | undefined;
  username: string | undefined;
  password: string | undefined;
  position: string | undefined;
  image: string | undefined;

  // --------------------------------------------------------
  constructor(private service: EmployeeServiceService, private cookieService: CookieService) {}

  async ngOnInit(): Promise<void> {
    const response = await this.service.getEmployees();
    this.employeeList = await (<Employee[]>response);
    this.employeeFilter = await this.employeeList;
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.EMPLOYEES_PATH);
  }

  // ---------------------- function ---------------------

  showEditDialog(id: string) {
    const Eid = parseInt(id);
    this.editVisible = true;
    this.employeeList.filter((employee) => {
      if (employee.id == Eid) {
        this.id = employee.id;
        this.name = employee.name;
        this.age = employee.age;
        this.address = employee.address;
        this.phone = employee.phone;
        this.username = employee.username;
        this.password = employee.password;
        this.position = employee.position;
        this.image = employee.image;
      }
    });
  }

  showAddDialog() {
    this.addVisible = true;
    this.id = undefined;
    this.name = "";
    this.position = "";
    this.age = undefined;
    this.address = "";
    this.phone = "";
    this.username = "";
    this.password = "";
    this.image = "";
  }

  //----------------------- services --------------------
  //Search
  search(): void {
    if(this.searchText != "" && this.searchText != null){
      this.service.getSearchV2(this.searchText).subscribe((result: any)=>{
        this.employeeFilter = result;
      });
    } else {
      const response =  this.service.getEmployeesV2().subscribe((result: any)=>{
        this.employeeList = result
        this.employeeFilter =  this.employeeList;
      });
    }
  }

  //DELETE
  async deleteEmployee(Eid: any): Promise<void> {
    Eid = parseInt(Eid);
    const response = await this.service.deleteEmployee(Eid);
    setTimeout(() => window.location.reload(), 0);
  }

  //UPDATE
  async confirmEdit() {
    try {
      await this.service.updateEmployee(
        this.id,
        this.name,
        this.age,
        this.address,
        this.phone,
        this.username,
        this.password,
        this.position,
        this.image
      );
      setTimeout(() => window.location.reload(), 0);
      this.editVisible = false;
    } catch (error) {
      console.log(error);
    }
  }

  //INSERT
  async confirmInsertEmployee() {
    try {
      await this.service.insertEmployee(
        this.name,
        this.age,
        this.address,
        this.phone,
        this.username,
        this.password,
        this.position,
        this.image
      );
      setTimeout(() => window.location.reload(), 0);
      this.addVisible = false;
    } catch (error) {
      console.log(error);
    }
  }
}
