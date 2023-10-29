import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AcceptProduct, Product } from '../model/model';
import { ProductService } from '../service/product/product.service';
import { CookieService } from 'ngx-cookie-service';
import {
  Account,
  Category,
  CurrentPath,
  StatusProductToRequestAceept,
} from '../config/global';
// import { PackProductsService } from '../service/packProducts/packProducts.service';
import { AcceptProductService } from '../service/acceptProduct/acceptProduct.service';

@Component({
  selector: 'app-packProduct',
  templateUrl: './packProduct.component.html',
  styleUrls: ['./packProduct.component.css'],
})
export class PackProductComponent implements OnInit {
  // packProductList: PackProducts[] = [];
  // packProductFilter: PackProducts[] = [];
  packProductList: AcceptProduct[] = [];
  packProductFilter: AcceptProduct[] = [];
  addPackProducts: Product[] = [];
  addPackProductsFilter: Product[] = [];
  productsList: Product[] = [];
  productsFilter: Product[] = [];

  searchText: string = '';
  addProductText: string = '';
  arrayTextIdProduct: string[] = [];

  visible: boolean = false;
  addVisible: boolean = false;
  editVisible: boolean = false;
  visibleEdit2: boolean = false;

  id: number | undefined;
  Ename: string | undefined;
  brand: string | undefined;
  model: string | undefined;
  description: string | undefined;
  price: number | undefined | any;
  amount: number | undefined;
  status: string | undefined;
  image: string | undefined;
  total: number = 0;
  product: string[] = [];

  accountName = this.getAccoutDeatial(Account.ACCOUNT_NAME);
  accountID = this.getAccoutDeatial(Account.ACCOUNT_ID);

  constructor(
    private productService: ProductService,
    // private packProductsService: PackProductsService,
    private acceptProductService: AcceptProductService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.getPackProducts();
    this.getProducts();
    this.cookieService.set(
      CurrentPath.CURRENT_PATH,
      CurrentPath.PACKPRODUCT_PATH
    );
  }

  async showDialog(id: any) {
    this.productsFilter = [];
    this.packProductFilter.filter((p) => {
      if (p.id === id) {
        this.id = p.id;
        this.brand = p.brand;
        this.model = p.model;
        this.description = p.description;
        this.price = p.price;
        this.amount = p.amount;
        this.product = p.product.split(',');
        this.image = p.image;
      }
    });
    this.visible = true;

    for (let numId of this.product) {
      let newNum = parseInt(numId);
      for (let p of this.productsList) {
        if (newNum === p.id) {
          this.productsFilter.push(p);
        }
      }
    }
  }

  showDialogEdit(id: number) {
    this.productsList.filter((p) => {
      if (p.id === id) {
        this.id = p.id;
        this.brand = p.brand;
        this.model = p.model;
        this.description = p.description;
        this.price = p.price;
        this.amount = p.amount;
        this.image = p.image;
      }
    });
    this.visibleEdit2 = true;
  }

  showAddItemDialog(id: number) {
    let check: Array<any> = [];
    this.addPackProductsFilter.filter((p) => {
      check.push(p);
    });
    check.forEach((item) => {
      item.forEach(
        (element: {
          id: any;
          brand: any;
          description: any;
          model: any;
          price: any;
          amount: any;
          image: any;
        }) => {
          if (element.id === id) {
            this.id = element.id;
            this.brand = element.brand;
            this.model = element.model;
            this.description = element.description;
            this.price = element.price;
            this.amount = element.amount;
            this.image = element.image;
            // console.log(this.id, this.brand, this.description, this.model, this.price, this.amount, this.image)
          }
        }
      );
    });
    this.visible = true;
  }

  showAddDialog() {
    this.addPackProducts = [];
    this.addPackProductsFilter = [];
    this.Ename = '';
    this.brand = '';
    this.model = '';
    this.amount = null!;
    this.description = '';
    this.status = '';
    this.image = '';
    this.addVisible = true;
  }

  showEditDialog(id: any, status: any) {
    if (status == 'บันทึกร่าง') {
      this.addPackProducts = [];
      this.addPackProductsFilter = [];
      this.arrayTextIdProduct = [];
      this.acceptProductService
        .getAcceptProductsByIdV2(id)
        .subscribe((result: any) => {
          console.log(result[0].product.length);
          if (result[0].product.length != 0) {
            let ar = result[0].product.split(',');
            ar.forEach((element: any) => {
              this.productService
                .getProductsByIdV2(element)
                .subscribe((result: any) => {
                  console.log(result);
                  let objLength = Object.values(result).length;
                  if (objLength > 0) {
                    this.arrayTextIdProduct.push(element);
                    console.log(this.arrayTextIdProduct);
                    this.addPackProducts.push(result);
                    this.addPackProductsFilter = this.addPackProducts.slice();
                    this.sumPrice();
                  }
                });
            });
          }
          this.Ename = result[0].Eid;
          this.brand = result[0].brand;
          this.model = result[0].model;
          this.price = result[0].price;
          this.amount = result[0].amount;
          this.description = result[0].description;
          this.image = result[0].image;
        });
      this.id = id;
      this.editVisible = true;
    }
  }

  async addProduct() {
    if (this.addProductText != '') {
      if (/^[0-9]+$/.test(this.addProductText)) {
        const newProduct = await this.productService.getProductsById(
          this.addProductText
        );
        let newproduct: Product = <Product>newProduct;
        let objLength = Object.values(newproduct).length;
        if (objLength > 0) {
          this.arrayTextIdProduct.push(this.addProductText);
          console.log(this.arrayTextIdProduct);
          this.addPackProducts.push(newproduct);
          this.addPackProductsFilter = this.addPackProducts.slice();
          this.sumPrice();
        } else {
          console.log('Length: ', objLength);
        }
      } else {
        alert('กรุณาใส่ตัวเลข ID');
      }
    }
  }

  deleteItem(id: string, price: number) {
    this.total -= price;
    let indexOfText = this.arrayTextIdProduct.indexOf('' + id);
    this.arrayTextIdProduct.splice(indexOfText, 1);
    let check: Array<any> = [];
    this.addPackProductsFilter.filter((p) => {
      check.push(p);
    });
    // console.log(check); //[[a],[a]]
    let count = 0;
    let index;
    const loop = check.filter((c) => {
      let a = c.findIndex((c: any) => {
        if (c.id === id) {
          index = count;
        }
      });
      count++;
    });
    this.addPackProducts.splice(index!, 1);
    this.addPackProductsFilter = this.addPackProducts;
  }

  sumPrice() {
    this.total = 0;
    let check: Array<any> = [];
    this.addPackProductsFilter.filter((p) => {
      check.push(p);
    });
    check.forEach((item) => {
      item.forEach((element: { price: any }) => {
        this.total += parseFloat(element.price);
      });
    });
  }

  colorStatus(text: string) {
    if (text === StatusProductToRequestAceept.APPROVED) {
      return 'success';
    } else if (text === StatusProductToRequestAceept.DISAPPROVAL) {
      return 'danger';
    } else if (text === StatusProductToRequestAceept.DRAFT) {
      return 'primary';
    } else {
      return 'warning';
    }
    // if (text === StatusProductToRequestAceept.APPROVED) {
    //   return '#22C55E';
    // } else if (text === StatusProductToRequestAceept.DISAPPROVAL) {
    //   return '#EF4444';
    // } else if (text === StatusProductToRequestAceept.DRAFT) {
    //   return '#3B82F6';
    // } else {
    //   return '#F59E0B';
    // }
  }

  iconsSetting(text: string) {
    if (text === StatusProductToRequestAceept.DRAFT) {
      return 'pi pi-pencil';
    }
  }

  // --------------------- service ------------------------

  //GET
  async getPackProducts() {
    const response = await this.acceptProductService.getAcceptProducts();
    this.packProductList = <AcceptProduct[]>response;
    this.packProductFilter = this.packProductList;
    // console.log(response);
  }

  //Search
  search() {
    if (this.searchText != '' && this.searchText != null) {
      this.acceptProductService
        .getPackProductSearchV2(this.searchText)
        .subscribe((result: any) => {
          console.log(result);
          this.packProductFilter = result;
        });
    } else {
      this.acceptProductService
        .getAcceptProductsV2()
        .subscribe((result: any) => {
          this.packProductList = result;
          this.packProductFilter = this.packProductList;
        });
    }
  }

  //GET PRODUCT
  async getProducts() {
    const response = await this.productService.getProducts();
    this.productsList = await (<Product[]>response);
  }

  //INSERT INTO PACK_PRODUCT
  async savePackProduct() {}

  //INSERT IN TO ACCRPTPRODUCT
  async insetProduct(action: string) {
    if (this.arrayTextIdProduct.length > 0 && this.arrayTextIdProduct != null) {
      let status = '';
      let product = this.arrayTextIdProduct.toString();
      if (action === 'SAVE') {
        status = StatusProductToRequestAceept.DRAFT;
      } else if (action === 'APPROVAL') {
        status = StatusProductToRequestAceept.NOT_YET_APPROVED;
      }
      try {
        console.log(new Date());
        let packProduct: AcceptProduct = {
          id: 0,
          Eid: parseInt(this.accountID),
          Ename: this.accountName,
          brand: this.brand!,
          model: this.model!,
          description: this.description!,
          date: new Date(),
          price: this.price!,
          amount: this.amount!,
          status: status,
          product: product, //fix this !!!! to array
          image: this.image!,
        };

        let response = await this.acceptProductService.insertAcceptProduct(
          packProduct
        );
        console.log(response);
        setTimeout(() => window.location.reload(), 0);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('กรุณาเพิ่มสินค้าที่ต้องการจัดโปรโมชั่น');
    }
  }

  //UPDATE INTO PACK_PRODUCT
  updateProduct(action: string) {
    let status = '';
    let product = this.arrayTextIdProduct.toString();
    if (action === 'SAVE') {
      status = StatusProductToRequestAceept.DRAFT;
    } else if (action === 'APPROVAL') {
      status = StatusProductToRequestAceept.NOT_YET_APPROVED;
    }
    let packProduct: AcceptProduct = {
      id: this.id!,
      Eid: parseInt(this.accountID),
      Ename: this.accountName,
      brand: this.brand!,
      model: this.model!,
      description: this.description!,
      date: new Date(),
      price: this.price!,
      amount: this.amount!,
      status: status,
      product: product, //fix this !!!! to array
      image: this.image!,
    };
    console.log('before');
    this.acceptProductService.updateProductV2(packProduct).subscribe();
    console.log('after');

    setTimeout(() => window.location.reload(), 0);
  }

  // --------------------- Cookie Service ------------------------
  getAccoutDeatial(account: string) {
    return this.cookieService.get(account);
  }
}
