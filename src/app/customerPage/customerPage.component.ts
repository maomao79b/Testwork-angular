import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/model';
import { CustomerServiceService } from '../service/customer/customerService.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
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

  id: any;
  name: any;
  age: any;
  address: any;
  phone: any;
  email: any;
  password: any;

  // ----------------------------------------------

  constructor(
    private service: CustomerServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
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
        customer.email
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
        this.email = customer.email;
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
      await this.service.updateCustomer(
        this.id,
        this.name,
        this.age,
        this.address,
        this.phone,
        this.email,
        this.password
      );
      setTimeout(() => window.location.reload(), 0);
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
        this.email,
        this.password
      );
      setTimeout(() => window.location.reload(), 0);
      this.addVisible = false;
    } catch (error) {
      console.log(error);
    }
  }
}
