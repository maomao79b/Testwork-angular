import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/model';
import { EmployeeServiceService } from '../service/employee/employeeService.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentPath } from '../config/global';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employeePage',
  templateUrl: './employeePage.component.html',
  styleUrls: ['./employeePage.component.css'],
})
export class EmployeePageComponent implements OnInit {
  // --------------------- Attribute -------------------------
  inputForms: FormGroup;
  employeeList: Employee[] = [];
  employeeFilter: Employee[] = [];

  addVisible: boolean = false;
  editVisible: boolean = false;

  searchText: string = '';

  // id: number | undefined;
  // name: string | undefined;
  // age: number | undefined;
  // address: string | undefined;
  // phone: string | undefined;
  // username: string | undefined;
  // password: string | undefined;
  // position: string | undefined;
  // image: string | undefined;

  // --------------------------------------------------------
  constructor(private service: EmployeeServiceService, private cookieService: CookieService) {
    this.inputForms = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      image: new FormControl('')
    });
  }

  async ngOnInit(): Promise<void> {
    const response = await this.service.getEmployees();
    this.employeeList = await (<Employee[]>response);
    this.employeeFilter = await this.employeeList;
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.EMPLOYEES_PATH);
  }

  // ---------------------- function ---------------------

  showEditDialog(id: string) {
    const formControl = this.inputForms.controls;
    const Eid = parseInt(id);
    this.editVisible = true;
    this.employeeList.filter((employee) => {
      if (employee.id == Eid) {
        formControl["id"].setValue(employee.id);
        formControl["name"].setValue(employee.name);
        formControl["age"].setValue(employee.age);
        formControl["address"].setValue(employee.address);
        formControl["phone"].setValue(employee.phone);
        formControl["username"].setValue(employee.username);
        formControl["password"].setValue(employee.password);
        formControl["position"].setValue(employee.position);
        formControl["image"].setValue(employee.image);
      }
    });
  }

  showAddDialog() {
    const formControl = this.inputForms.controls;
    this.addVisible = true;
    formControl['id'].setValue(undefined);
    formControl['name'].setValue('');
    formControl['age'].setValue(undefined);
    formControl['address'].setValue('');
    formControl['phone'].setValue('');
    formControl['username'].setValue('');
    formControl['password'].setValue('');
    formControl['position'].setValue('');
    formControl['image'].setValue('');
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
    const formControl = this.inputForms.controls;
    try {
      let employee : Employee = {
        id :  formControl["id"].value,
        name : formControl["name"].value,
        age : formControl["age"].value,
        address : formControl["address"].value,
        phone : formControl["phone"].value,
        username : formControl["username"].value,
        password : formControl["password"].value,
        position : formControl["position"].value,
        image : formControl["image"].value
      };

      await this.service.updateEmployee(
        formControl["id"].value,
        employee
      );

      setTimeout(() => window.location.reload(), 500);
      this.editVisible = false;
    } catch (error) {
      console.log(error);
    }
  }

  //INSERT
  async confirmInsertEmployee() {
    try {
      const formControl = this.inputForms.controls;
      let newEmployee : Employee = {
        id :  formControl["id"].value,
        name : formControl["name"].value,
        age : formControl["age"].value,
        address : formControl["address"].value,
        phone : formControl["phone"].value,
        username : formControl["username"].value,
        password : formControl["password"].value,
        position : formControl["position"].value,
        image : formControl["image"].value
      }
      await this.service.insertEmployee(
        newEmployee
      );
      setTimeout(() => window.location.reload(), 500);
      this.addVisible = false;
    } catch (error) {
      console.log(error);
    }
  }
}
