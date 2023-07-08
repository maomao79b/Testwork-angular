import { Injectable } from '@angular/core';
import { AcceptProduct } from 'src/app/model/model';

@Injectable({
  providedIn: 'root',
})
export class AcceptProductServiceService {
  myDate = new Date();
  productList: AcceptProduct[] = [
    {
      id: 1,
      employeeName: 'John',
      date: this.myDate,
      description: 'CPU, Mainborad, RAM, HDD',
      image: '',
      price: 100,
    },
    {
      id: 2,
      employeeName: 'John',
      date: this.myDate,
      description: 'CPU, Mainborad, RAM, HDD',
      image: '',
      price: 200,
    },
    {
      id: 3,
      employeeName: 'John',
      date: this.myDate,
      description: 'CPU, Mainborad, RAM, HDD',
      image: '',
      price: 300,
    },
    {
      id: 4,
      employeeName: 'John',
      date: this.myDate,
      description: 'CPU, Mainborad, RAM, HDD',
      image: '',
      price: 400,
    },
    {
      id: 5,
      employeeName: 'John',
      date: this.myDate,
      description: 'CPU, Mainborad, RAM, HDD',
      image: '',
      price: 500,
    },
  ];

  constructor() {}

  getAcceptProduct(){
    return this.productList;
  }
}
