import { Component, OnInit } from '@angular/core';
import { AcceptProductServiceService } from '../service/acceptProduct/acceptProductService.service';
import { AcceptProduct } from 'src/app/model/model';
@Component({
  selector: 'app-acceptProductPage',
  templateUrl: './acceptProductPage.component.html',
  styleUrls: ['./acceptProductPage.component.css']
})
export class AcceptProductPageComponent implements OnInit {

  productList: AcceptProduct[] = [];

  constructor(private service: AcceptProductServiceService) { }

  ngOnInit() {
    this.productList = this.service.getAcceptProduct();
  }

}
