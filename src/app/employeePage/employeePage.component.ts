import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/model';
import { EmployeeServiceService } from '../service/employee/employeeService.service';

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
  email: string | undefined;
  password: string | undefined;
  position: string | undefined;

  // --------------------------------------------------------
  constructor(private service: EmployeeServiceService) {}

  async ngOnInit(): Promise<void> {
    const response = await this.service.getEmployees();
    this.employeeList = await (<Employee[]>response);
    console.log(response);
    this.employeeFilter = await this.employeeList;
  }

  // ---------------------- function ---------------------
  search(): void {
    this.employeeFilter = this.employeeList.filter((employee) => {
      console.log(this.searchText);
      return (
        employee.id
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        employee.name
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        employee.email
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }
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
        this.email = employee.email;
        this.password = employee.password;
        this.position = employee.position;
      }
    });
  }

  showAddDialog() {
    this.addVisible = true;
  }

  //----------------------- services --------------------
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
        this.email,
        this.password,
        this.position
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
        this.email,
        this.password,
        this.position
      );
      setTimeout(() => window.location.reload(), 0);
      this.addVisible = false;
    } catch (error) {
      console.log(error);
    }
  }
}
