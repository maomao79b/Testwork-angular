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

  editVisible: boolean = false;
  payVisible: boolean = false;

  // PRODUCT
  id: number | undefined;
  Ename: string | undefined;
  brand: string | undefined;
  model: string | undefined;
  description: string | undefined;
  price: number | undefined;
  amount: number | undefined;
  status: string | undefined;
  image: string | undefined;

  // SaleHistory
  cid: number | undefined;
  total: number = 0;
  product: string[] = [];

  fixAmount: number = 0;
  fixAmountIndex: number = 0;

  // ------------------------ Constructor ------------------------
  constructor(private cookieService: CookieService, private saleHistoryService: SaleHistoryService, private productService: ProductService) { }

  ngOnInit() {
    this.cookieService.set(
      CurrentPath.CURRENT_PATH,
      CurrentPath.SALE_PATH
    );
    if(localStorage.getItem('ProductList') != null) {
      this.productList = JSON.parse(localStorage.getItem('ProductList')!);
      this.amountProduct = JSON.parse(localStorage.getItem('amountProduct')!);
      this.productFilter = this.productList.slice();
    }
  }
  async clickId(id: number) {
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
  // async showDialog(id: number) {
  //   // this.productsFilter = [];
  //   // this.packProductFilter.filter((p) => {
  //   //   if (p.id === id) {
  //   //     this.id = p.id;
  //   //     this.brand = p.brand;
  //   //     this.model = p.model;
  //   //     this.description = p.description;
  //   //     this.price = p.price;
  //   //     this.amount = p.amount;
  //   //     this.product = p.product.split(',');
  //   //     this.image = p.image;
  //   //   }
  //   // });
  //   // this.visible = true;

  //   // for (let numId of this.product){
  //   //   let newNum = parseInt(numId)
  //   //   for (let p of this.productsList){
  //   //     if(newNum === p.id){
  //   //       this.productsFilter.push(p);
  //   //     }
  //   //   }
  //   // }
  // }


  showEditDialog(index: number, amount: number){
    this.fixAmountIndex = index;
    this.amount = amount;
    this.fixAmount = this.amountProduct[index];
    this.editVisible = true;
  }

  minus(){
    if(this.fixAmount-1 > 0){
      this.fixAmount -= 1;
    }
  }

  plus(){
    if(this.fixAmount+1 <= this.amount!){
      this.fixAmount += 1;
    }else{
      alert("สินค่าเหลือ "+this.amount+" ชิ้น");
    }
  }

  confirmEdit(){
    if(this.fixAmount > this.amount!){
      this.amountProduct[this.fixAmountIndex] = this.amount!;
      alert("สินค่าเหลือ "+this.amount+" ชิ้น");
    }else if(this.fixAmount < 1){
      this.deleteProduct(this.fixAmountIndex);
      this.editVisible = false;
    }else{
      this.amountProduct[this.fixAmountIndex] = this.fixAmount;
      this.editVisible = false;
    }
    this.saveTolocal();
  }

  deleteProduct(index: number){
    console.log(index);
    delete this.productList[index];
    this.productFilter = this.productList.slice();
    this.saveTolocal();
  }

  clearProduct(){
    this.total = 0;
    this.productList = [];
    this.productFilter = this.productList.slice();
    localStorage.removeItem('ProductList');
    localStorage.removeItem('amountProduct');
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
          let count = 0 ;
          let check = true;
          this.productList.forEach(p=>{
            let arr = <Array<Product>><unknown>p;
            if(arr[0].id === parseInt(this.addProductText)){
              this.amountProduct[count] += 1
              check = false;
              return;
            }
            count++;
          })
          if(check){
            this.amountProduct.push(1);
            this.productList.push(newproduct);
          }
          this.productFilter = this.productList.slice();
          this.sumPrice();
        } else {
          console.log('Length: ', objLength);
          alert("ไม่เจอสินค้าที่ระบุ");
        }
      }else{
        alert("กรุณาใส่ตัวเลข ID");
      }
    }
    this.saveTolocal();
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

  saveTolocal(){
    localStorage.removeItem('ProductList');
    localStorage.removeItem('amountProduct');
    localStorage.setItem('ProductList', JSON.stringify(this.productList));
    localStorage.setItem('amountProduct', JSON.stringify(this.amountProduct));
  }

  payBill(){
    this.payVisible = true;
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
