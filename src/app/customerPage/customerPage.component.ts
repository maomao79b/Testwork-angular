import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/model';
import { CustomerServiceService } from '../service/customer/customerService.service';
import { CurrentPath } from '../config/global';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-customerPage',
  templateUrl: './customerPage.component.html',
  styleUrls: ['./customerPage.component.css'],
  providers: [MessageService],
})
export class CustomerPageComponent implements OnInit {
  // --------------------- Attribute -------------------------

  inputForms: FormGroup;

  customerList: Customer[] = [];
  customerFilter: Customer[] = [];

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
  // image: string | undefined;

  // --------------------- Begin Start -------------------------

  constructor(
    private service: CustomerServiceService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {
    this.inputForms = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  ngOnInit() {
    this.cookieService.set(
      CurrentPath.CURRENT_PATH,
      CurrentPath.CUSTOMERS_PATH
    );
    this.getCustomer();
  }

  // ---------------------- function ---------------------
  showEditDialog(id: any) {
    const formControls = this.inputForms.controls;
    const Cid = parseInt(id);
    this.editVisible = true;
    this.customerList.filter((customer) => {
      if (customer.id == Cid) {
        formControls['id'].setValue(customer.id);
        formControls['name'].setValue(customer.name);
        formControls['age'].setValue(customer.age);
        formControls['address'].setValue(customer.address);
        formControls['phone'].setValue(customer.phone);
        formControls['username'].setValue(customer.username);
        formControls['password'].setValue(customer.password);
        formControls['image'].setValue(customer.image);
        // this.id = customer.id;
        // this.name = customer.name;
        // this.age = customer.age;
        // this.address = customer.address;
        // this.phone = customer.phone;
        // this.username = customer.username;
        // this.password = customer.password;
        // this.image = customer.image;
      }
    });
  }
  showAddDialog() {
    const formControls = this.inputForms.controls;
    this.addVisible = true;
    formControls['id'].setValue(undefined);
    formControls['name'].setValue('');
    formControls['age'].setValue(undefined);
    formControls['address'].setValue('');
    formControls['phone'].setValue('');
    formControls['username'].setValue('');
    formControls['password'].setValue('');
    formControls['image'].setValue('');
  }

  //----------------------- services --------------------

  //Search
  search(): void {
    if (this.searchText != '' && this.searchText != null) {
      this.service.getSearchV2(this.searchText).subscribe((result: any) => {
        this.customerFilter = result;
        console.log(result[0]);
      });
    } else {
      this.getCustomer();
    }
  }

  //GET
  async getCustomer(): Promise<void> {
    const response = await this.service.getCustomers();
    this.customerList = await (<Customer[]>response);
    this.customerFilter = await this.customerList;
  }

  //DELETE
  async deleteCustomer(Cid: any): Promise<void> {
    Cid = parseInt(Cid);
    await this.service.deleteCustomer(Cid);
    location.reload();
  }

  //UPDATE
  async confirmEdit() {
    const formControls = this.inputForms.controls;
    if (this.checkformat()) {
      try {
        let customers: Customer = {
          id: formControls['id'].value,
          name: formControls['name'].value,
          age: formControls['age'].value,
          address: formControls['address'].value,
          phone: formControls['phone'].value,
          username: formControls['username'].value,
          password: formControls['password'].value,
          image: formControls['image'].value,
        };
        await this.service.updateCustomer(formControls['id'].value, customers);
        location.reload();
        this.editVisible = false;
      } catch (error) {
        console.log(error);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: '',
        detail: 'อายุและเบอร์เป็นตัวเลขเท่านั้น',
      });
    }
  }

  //INSERT
  async confirmInsertCustomer() {
    const formControls = this.inputForms.controls;

    if (this.checkformat()) {
      try {
        let customers: Customer = {
          id: 0,
          name: formControls['name'].value,
          age: formControls['age'].value,
          address: formControls['address'].value,
          phone: formControls['phone'].value,
          username: formControls['username'].value,
          password: formControls['password'].value,
          image: formControls['image'].value,
        };
        await this.service.insertCustomer(customers);
        location.reload();
        this.addVisible = false;
      } catch (error) {
        console.log(error);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: '',
        detail: 'อายุและเบอร์เป็นตัวเลขเท่านั้น',
      });
    }
  }

  checkformat() {
    const formControls = this.inputForms.controls;
    if (
      this.isNumber(formControls['age'].value) &&
      this.isNumber(formControls['phone'].value)
    ) {
      return true;
    } else {
      return false;
    }
  }

  isNumber(n: any) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }
}
