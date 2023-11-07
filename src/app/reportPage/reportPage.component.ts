import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CurrentPath } from '../config/global';
import { SaleHistoryService } from '../service/saleHistory/saleHistory.service';
import { SaleHistory } from '../model/model';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-reportPage',
  templateUrl: './reportPage.component.html',
  styleUrls: ['./reportPage.component.css'],
})
export class ReportPageComponent implements OnInit {
  // ------------------------- Variable ---------------------------------
  historyList: SaleHistory[] = [];
  historyFilter: SaleHistory[] = [];
  itemHistory: any[] = [];
  imageList: string[] = [];

  visible: boolean = false;

  image: any;
  id: any;
  brand: any;
  model: any
  description: any;
  amount: any;
  price: any;

  // ------------------------- Oninit -----------------------------------------
  constructor(
    private cookieService: CookieService,
    private saleHistoryService: SaleHistoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.REPORT_PATH);
    this.getAllHistory();
  }

  // ----------------------- Function --------------------------------
  showDialog(id: any) {
    this.getProductById(id).subscribe((result: any)=>{
      this.image = result.image;
      this.id = result.id;
      this.brand = result.brand;
      this.model = result.model;
      this.description = result.description;
      this.amount = result.amount;
      this.price = result.price;
    });
    this.visible = true;
  }

  changeRowColor(event: any) {
    const target = event.target;
    if (target.tagName === 'TR') {
      target.classList.toggle('highlighted-row');
    }
  }


  show(id: any) {
    this.itemHistory = [];
    this.getHistoryById(id).subscribe((result: any)=>{
      let product_amount = result.amount.split(',');
      let product_id = result.product.split(',');
      for (let i=0;i<product_amount.length ;i++){
        this.getProductById(product_id[i]).subscribe(pro=>{
          let product = {
            id : pro.id ,
            brand : pro.brand,
            price: pro.price,
            amount: product_amount[i]
          };
          this.itemHistory.push(product);
        });
      }
    })
  }

  // setImage(id: any){
  //   this.getProductById(id).subscribe((result: any)=>{
  //     console.log(result.image);
  //     // this.imageList.push(result.image);
  //   })
  // }

  // ----------------------- Service --------------------------------
  // GET ALL
  getAllHistory() {
    this.saleHistoryService.getHistory().subscribe((result: any) => {
      console.log(result);
      this.historyList = result;
      this.historyFilter = this.historyList;
    });
  }

  //GET PRODUCT BY ID
  getProductById(id: any){
    return this.productService.getProductsByIdV2(id);
  }

  //GET HISTORY BY ID
  getHistoryById(id: any){
    return this.saleHistoryService.getHistoryByid(id);
  }

  // ----------------------- Cookie --------------------------------
}
