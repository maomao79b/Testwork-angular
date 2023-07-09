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
  // ----------------------------------------------
  customerList: Customer[] = [];
  customerFilter: Customer[] = [];

  visible: boolean = false;

  id: number | undefined;
  name: string | undefined;
  age: number | undefined;
  address: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  password: string | undefined;

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
  searchText: string = '';

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

  showEditDialog(id: string) {
    const Cid = parseInt(id);
    this.visible = true;
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
    this.visible = true;
  }

  //----------------------- services --------------------
  //GET
  async getCustomer(): Promise<void> {
    const response = await this.service.getCustomers();
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
      const customerDialog = this.customerList.filter((customer) => {
        if (customer.id == this.id) {
          customer.name = this.name!;
          customer.age = this.age!;
          customer.address = this.address!;
          customer.phone = this.phone!;
          customer.email = this.email!;
          customer.password = this.password!;
        }
      });
      await this.service.updateCustomer(
        this.id,
        this.name,
        this.age,
        this.address,
        this.phone,
        this.email,
        this.password
      );
      this.visible = false;
    } catch (error) {
      console.log(error);
    }
  }

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
      const response = await this.service.getCustomers();
      this.customerList = await (<Customer[]>response);
      this.customerFilter = await this.customerList;
      // let newCustomer: Customer = {
      //   id: id!,
      //   name: this.name!,
      //   age: this.age!,
      //   address: this.address!,
      //   phone: this.phone!,
      //   email: this.email!,
      //   password: this.password!,
      // };
      // this.customerList.push(newCustomer);
      this.visible = false;
    } catch (error) {
      console.log(error);
    }
  }
}
