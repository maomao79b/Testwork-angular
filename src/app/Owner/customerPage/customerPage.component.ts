import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/model';
import { CustomerServiceService } from '../../service/customer/customerService.service';
@Component({
  selector: 'app-customerPage',
  templateUrl: './customerPage.component.html',
  styleUrls: ['./customerPage.component.css']
})
export class CustomerPageComponent implements OnInit {

  customerList: Customer[] = [];
  customerFilter: Customer[] = [];

  constructor(private service: CustomerServiceService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.service.getCustomers();
    this.customerList = await <Customer[]>response;
    this.customerFilter = await this.customerList;
  }

  searchText: string = "";

  search(): void {
    this.customerFilter = this.customerList.filter(customer => {
      console.log(this.searchText);
      return customer.id.toString().toLocaleLowerCase().includes(this.searchText.toLowerCase()) ||
      customer.name.toLocaleLowerCase().includes(this.searchText.toLowerCase()) ||
      customer.email.toLocaleLowerCase().includes(this.searchText.toLowerCase());
    })
  }
}
