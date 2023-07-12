import { CookieService } from 'ngx-cookie-service';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/model';
import { CustomerServiceService } from '../service/customer/customerService.service';
import { Router } from '@angular/router';
import { CurrentPath } from '../config/global';
@Component({
  selector: 'app-customerPage',
  templateUrl: './customerPage.component.html',
  styleUrls: ['./customerPage.component.css'],
})
export class CustomerPageComponent implements OnInit {
  // --------------------- Attribute -------------------------
  customerList: Customer[] = [];
  customerFilter: Customer[] = [];

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

  // ----------------------------------------------

  constructor(
    private service: CustomerServiceService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.CUSTOMERS_PATH);
    this.getCustomer();
  }

  // ---------------------- function ---------------------

  search(): void {
    this.customerFilter = this.customerList.filter((customer) => {
      return (
        customer.id
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        customer.name
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        customer.username
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }

  showEditDialog(id: any) {
    const Cid = parseInt(id);
    this.editVisible = true;
    this.customerList.filter((customer) => {
      if (customer.id == Cid) {
        this.id = customer.id;
        this.name = customer.name;
        this.age = customer.age;
        this.address = customer.address;
        this.phone = customer.phone;
        this.username = customer.username;
        this.password = customer.password;
      }
    });
  }

  showAddDialog() {
    this.addVisible = true;
  }

  //----------------------- services --------------------
  //GET
  async getCustomer(): Promise<void> {
    const response = await this.service.getCustomers("","");
    this.customerList = await (<Customer[]>response);
    this.customerFilter = await this.customerList;
  }

  //DELETE
  async deleteCustomer(Cid: any): Promise<void> {
    Cid = parseInt(Cid);
    const response = await this.service.deleteCustomer(Cid);
    const index = this.customerFilter.findIndex((c) => c.id === Cid);
    this.customerFilter.splice(index, 1);
  }

  //UPDATE
  async confirmEdit() {
    try {
      let customers: Customer = {
        id: this.id!,
        name: this.name!,
        age: this.age!,
        address: this.address!,
        phone: this.phone!,
        username: this.username!,
        password: this.password!

      }
      await this.service.updateCustomer(customers);
      location.reload();
      this.editVisible = false;
    } catch (error) {
      console.log(error);
    }
  }

  //INSERT
  async confirmInsertCustomer() {
    try {
      await this.service.insertCustomer(
        this.name,
        this.age,
        this.address,
        this.phone,
        this.username,
        this.password
      );
      setTimeout(() => window.location.reload(), 0);
      this.addVisible = false;
    } catch (error) {
      console.log(error);
    }
  }
}
