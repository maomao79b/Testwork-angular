import { Component, OnInit } from '@angular/core';
import { CurrentPath } from '../config/global';
import { CookieService } from 'ngx-cookie-service';
import { Product, SaleHistory } from '../model/model';
import { SaleHistoryService } from '../service/saleHistory/saleHistory.service';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-salePage',
  templateUrl: './salePage.component.html',
  styleUrls: ['./salePage.component.css']
})
export class SalePageComponent implements OnInit {

  // ------------------------ Attribute Variables ------------------------

  productList: Product[] = [];
  productFilter: Product[] = [];
  amountProduct: number[] = [];

  addProductText: string = '';

  id: number | undefined;
  Ename: string | undefined;
  brand: string | undefined;
  model: string | undefined;
  description: string | undefined;
  price: number | undefined;
  amount: number | undefined;
  status: string | undefined;
  image: string | undefined;
  total: number = 0;
  product: string[] = [];


  // ------------------------ Constructor ------------------------
  constructor(private cookieService: CookieService, private saleHistoryService: SaleHistoryService, private productService: ProductService) { }

  ngOnInit() {
    this.cookieService.set(
      CurrentPath.CURRENT_PATH,
      CurrentPath.SALE_PATH
    );
  }

  async showDialog(id: number) {
    // this.productsFilter = [];
    // this.packProductFilter.filter((p) => {
    //   if (p.id === id) {
    //     this.id = p.id;
    //     this.brand = p.brand;
    //     this.model = p.model;
    //     this.description = p.description;
    //     this.price = p.price;
    //     this.amount = p.amount;
    //     this.product = p.product.split(',');
    //     this.image = p.image;
    //   }
    // });
    // this.visible = true;

    // for (let numId of this.product){
    //   let newNum = parseInt(numId)
    //   for (let p of this.productsList){
    //     if(newNum === p.id){
    //       this.productsFilter.push(p);
    //     }
    //   }
    // }
  }

  showEditDialog(id: string){

  }

  deleteProduct(id: string){

  }

  async addProduct() {
    if (this.addProductText != '') {
      if((/^[0-9]+$/.test(this.addProductText))){
        const newProduct = await this.productService.getProductsById(
          this.addProductText
        );
        let newproduct: Product = <Product>newProduct;
        let objLength = Object.values(newproduct).length;
        if (objLength > 0) {
          this.amountProduct.push(1);
          console.log(this.amountProduct);
          this.productList.push(newproduct);
          this.productFilter = this.productList.slice();
          console.log(this.productFilter);
          this.sumPrice();
        } else {
          console.log('Length: ', objLength);
          alert("ไม่เจอสินค้าที่ระบุ");
        }
      }else{
        alert("กรุณาใส่ตัวเลข ID");
      }
    }
  }

  sumPrice() {
    this.total = 0;
    let check: Array<any> = [];
    this.productFilter.filter((p) => {
      check.push(p);
    });
    check.forEach((item) => {
      item.forEach((element: { price: any }) => {
        this.total += parseFloat(element.price);
      });
    });
  }

  // ------------------------ Service ------------------------
  //GET PRODUCT
  async getProductsById(id: string) {
    const response = await this.productService.getProductsById(id);
    let product = <Product>response;
  }

  //POST History
  async insertSaleHistory(){
    let saleHistory: SaleHistory = {
      id:0,
      cid:0,
      total:0,
      date: new Date(),
      product:''
    };
    await this.saleHistoryService.insertProduct(saleHistory);
  }


  // ------------------------ Cookie Service ------------------------


}
