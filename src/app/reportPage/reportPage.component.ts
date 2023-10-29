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
      this.image = result[0].image;
      this.id = result[0].id;
      this.brand = result[0].brand;
      this.model = result[0].model;
      this.description = result[0].description;
      this.amount = result[0].amount;
      this.price = result[0].price;
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
      let product_amount = result[0].amount.split(',');
      let product_id = result[0].product.split(',');
      for (let i=0;i<product_amount.length ;i++){
        this.getProductById(product_id[i]).subscribe(pro=>{
          let product = {
            id : pro[0].id ,
            brand : pro[0].brand,
            price: pro[0].price,
            amount: product_amount[i]
          };
          this.itemHistory.push(product);
        });
      }
    })
  }

  setImage(id: any){
    this.getProductById(id).subscribe((result: any)=>{
      console.log(result[0].image);
      this.imageList.push(result[0].image);
    })
  }

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
