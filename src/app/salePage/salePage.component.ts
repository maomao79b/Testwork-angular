import { Component, OnInit } from '@angular/core';
import { CurrentPath } from '../config/global';
import { CookieService } from 'ngx-cookie-service';
import { Product, SaleHistory } from '../model/model';
import { SaleHistoryService } from '../service/saleHistory/saleHistory.service';
import { ProductService } from '../service/product/product.service';
import { CustomerServiceService } from '../service/customer/customerService.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-salePage',
  templateUrl: './salePage.component.html',
  styleUrls: ['./salePage.component.css'],
  providers: [MessageService],
})
export class SalePageComponent implements OnInit {
  // ------------------------ Attribute Variables ------------------------

  productList: Product[] = [];
  productFilter: Product[] = [];
  amountProduct: number[] = [];

  addProductText: string = '';

  editVisible: boolean = false;
  payVisible: boolean = false;
  changeVisible: boolean = false;

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
  cidOrPhone: any;
  total: number = 0;
  getpaid: number = 0;
  change: number = 0;
  product: string[] = [];

  fixAmount: number = 0;
  fixAmountIndex: number = 0;

  // ------------------------ Constructor ------------------------
  constructor(
    private cookieService: CookieService,
    private saleHistoryService: SaleHistoryService,
    private productService: ProductService,
    private customerService: CustomerServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.SALE_PATH);
    if (localStorage.getItem('ProductList') != null) {
      this.productList = JSON.parse(localStorage.getItem('ProductList')!);
      this.amountProduct = JSON.parse(localStorage.getItem('amountProduct')!);
      this.productFilter = this.productList.slice();
      this.product = JSON.parse(localStorage.getItem('product')!);
      this.total = parseInt(localStorage.getItem('total')!);
    }
    this.sumPrice();
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

  showEditDialog(index: number, amount: number) {
    this.fixAmountIndex = index;
    this.amount = amount;
    this.fixAmount = this.amountProduct[index];
    this.editVisible = true;
  }

  minus() {
    if (this.fixAmount - 1 > 0) {
      this.fixAmount -= 1;
    }
  }

  plus() {
    if (this.fixAmount + 1 <= this.amount!) {
      this.fixAmount += 1;
    } else {
      alert('สินค่าเหลือ ' + this.amount + ' ชิ้น');
    }
  }

  confirmEdit() {
    // console.log("pp : "+this.product[this.fixAmountIndex]);
    //   console.log("aa : "+this.amountProduct[this.fixAmountIndex]);
    if (this.fixAmount > this.amount!) {
      this.amountProduct[this.fixAmountIndex] = this.amount!;
      alert('สินค่าเหลือ ' + this.amount + ' ชิ้น');
    } else if (this.fixAmount < 1) {
      this.deleteProduct(this.fixAmountIndex);
      this.product.splice(this.fixAmountIndex, 1);
      this.amountProduct.splice(this.fixAmountIndex, 1);
      this.sumPrice();
      this.editVisible = false;
    } else {
      this.amountProduct[this.fixAmountIndex] = this.fixAmount;
      this.sumPrice();
      this.editVisible = false;
    }
  }

  deleteProduct(index: number) {
    delete this.productList[index];
    this.productFilter = this.productList.slice();
    this.product.splice(index, 1);
    this.amountProduct.splice(index, 1);
    this.sumPrice();
    this.saveTolocal();
  }

  clearProduct() {
    this.total = 0;
    this.productList = [];
    this.productFilter = this.productList.slice();
    this.amountProduct = [];
    this.product = [];
    localStorage.removeItem('ProductList');
    localStorage.removeItem('amountProduct');
    localStorage.removeItem('product');
    localStorage.removeItem('total');
  }

  async addProduct() {
    console.log('hi');
    if (this.addProductText != '') {
      if (/^[0-9]+$/.test(this.addProductText)) {
        const newProduct = await this.productService.getProductsById(
          this.addProductText
        );
        let newproduct: Product = <Product>newProduct;
        let objLength = Object.values(newproduct).length;
        if (objLength > 0) {
          let count = 0;
          let check = true;
          this.productList.forEach((p) => {
            let arr = <Array<Product>>(<unknown>p);
            if (arr[0].id === parseInt(this.addProductText)) {
              this.amountProduct[count] += 1;
              check = false;
              return;
            }
            count++;
          });
          if (check) {
            this.amountProduct.push(1);
            this.product.push(this.addProductText);
            this.productList.push(newproduct);
          }
          this.productFilter = this.productList.slice();
          this.sumPrice();
        } else {
          console.log('Length: ', objLength);
          alert('ไม่เจอสินค้าที่ระบุ');
        }
      } else {
        alert('กรุณาใส่ตัวเลข ID');
      }
    }
    this.saveTolocal();
  }

  sumPrice() {
    this.total = 0;
    for (let i = 0; i < this.product.length; i++) {
      this.getProductByidV2(this.product[i]).subscribe((result: any) => {
        this.total += result[0].price * this.amountProduct[i];
      });
    }
    this.saveTolocal();
  }

  saveTolocal() {
    localStorage.removeItem('ProductList');
    localStorage.removeItem('amountProduct');
    localStorage.removeItem('product');
    localStorage.removeItem('total');
    localStorage.setItem('ProductList', JSON.stringify(this.productList));
    localStorage.setItem('amountProduct', JSON.stringify(this.amountProduct));
    localStorage.setItem('product', JSON.stringify(this.product));
    localStorage.setItem('total', this.total.toString());
  }

  payBill() {
    this.payVisible = true;
  }

  isNumber(n: any) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  checkCustomerData() {
    if (this.isNumber(this.cidOrPhone)) {
      this.customerService
        .getCheckCustomerdataV2(this.cidOrPhone)
        .subscribe((result: any) => {
          if (result.length > 0) {
            if (this.getpaid >= this.total) {
              this.change = this.getpaid - this.total;
              this.insertSaleHistory();
            } else {
              this.messageService.add({
                severity: 'warn',
                summary: 'Wrong',
                detail: 'จำนวนเงินไม่ถูกต้อง',
              });
            }
          } else {
            alert('ไม่พบ id หรือ เบอร์โทรศัพท์ที่ระบุ');
          }
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Wrong',
        detail: 'กรอกเป็นตัวเลข',
      });
    }
  }

  reduce(product: any, amount: any) {
    for (let i = 0; i < product.length; i++) {
      let newAmount;
      this.getProductByidV2(product[i]).subscribe((result: any) => {
        console.log('before: ' + result[0].amount);
        newAmount = result[0].amount - amount[i];
        result[0].amount = newAmount;
        this.updateProductById(result[0]).subscribe((result) => {
          console.log(result);
        });
      });
    }
  }

  // ------------------------ Service ------------------------
  //GET PRODUCT
  async getProductsById(id: string) {
    const response = await this.productService.getProductsById(id);
    let product = <Product>response;
  }

  //POST History
  insertSaleHistory() {
    // console.log(this.amountProduct.toString());
    let saleHistory: SaleHistory = {
      id: 0,
      cid: this.cidOrPhone,
      total: this.total,
      product: this.product.toString(),
      amount: this.amountProduct.toString(),
    };
    this.saleHistoryService.insertProduct(saleHistory).subscribe((result) => {
      this.reduce(this.product, this.amountProduct);
      if (result === 'Insert Successfully') {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'ชำระเงินเสร็จสิ้น',
        });
        this.changeVisible = true;
        this.clearProduct();
        this.payVisible = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'ชำระเงินไม่สำเร็จ',
        });
      }
    });
  }

  //update
  updateProductById(product: Product) {
    return this.productService.updateProductV2(product);
  }

  //GET BY ID
  getProductByidV2(id: any) {
    return this.productService.getProductsByIdV2(id);
  }

  //GET BY ID
  getHistoryByid(id: any) {
    return this.saleHistoryService.getHistoryByid(id);
  }

  // ------------------------ Cookie Service ------------------------
}
