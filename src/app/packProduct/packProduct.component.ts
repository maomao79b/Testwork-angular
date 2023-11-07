import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AcceptProduct, Product } from '../model/model';
import { ProductService } from '../service/product/product.service';
import { CookieService } from 'ngx-cookie-service';
import {
  Account,
  Category,
  CurrentPath,
  Login,
  StatusProductToRequestAceept,
} from '../config/global';
// import { PackProductsService } from '../service/packProducts/packProducts.service';
import { AcceptProductService } from '../service/acceptProduct/acceptProduct.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-packProduct',
  templateUrl: './packProduct.component.html',
  styleUrls: ['./packProduct.component.css'],
})
export class PackProductComponent implements OnInit {
  inputForms: FormGroup;

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
  ) {
    this.inputForms = new FormGroup({
      id: new FormControl(''),
      Ename: new FormControl(''),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      status: new FormControl(''),
      image: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getPackProducts();
    this.getProducts();
    this.cookieService.set(
      CurrentPath.CURRENT_PATH,
      CurrentPath.PACKPRODUCT_PATH
    );
  }

  async showDialog(id: any, status: any) {
    const formControls = this.inputForms.controls;
    if (status == 'บันทึกร่าง') {
      this.addPackProducts = [];
      this.addPackProductsFilter = [];
      this.arrayTextIdProduct = [];
      this.acceptProductService
        .getAcceptProductsByIdV2(id)
        .subscribe((result: any) => {
          if (result.product.length != 0) {
            let ar = result.product.split(',');
            ar.forEach((element: any) => {
              this.productService
                .getProductsByIdV2(element)
                .subscribe((result: any) => {
                  let objLength = Object.values(result).length;
                  if (objLength > 0) {
                    this.arrayTextIdProduct.push(element);
                    this.addPackProducts.push(result);
                    this.addPackProductsFilter = this.addPackProducts.slice();
                    this.sumPrice();
                  }
                });
            });
          }
          formControls['brand'].setValue(result.brand);
          formControls['model'].setValue(result.model);
          formControls['description'].setValue(result.description);
          formControls['price'].setValue(result.price);
          formControls['amount'].setValue(result.amount);
          formControls['image'].setValue(result.image);
        });
      formControls['id'].setValue(id);
      this.editVisible = true;
    } else {
      this.productsFilter = [];
      this.packProductFilter.filter((p) => {
        if (p.id === id) {
          formControls['id'].setValue(p.id);
          formControls['brand'].setValue(p.brand);
          formControls['model'].setValue(p.model);
          formControls['description'].setValue(p.description);
          formControls['price'].setValue(p.price);
          formControls['amount'].setValue(p.amount);
          formControls['image'].setValue(p.image);
          this.product = p.product.split(',');
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
  }

  showDialogEdit(id: number) {
    // const formControls = this.inputForms.controls;
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

  showAddDialog() {
    const formControls = this.inputForms.controls;
    this.addPackProducts = [];
    this.addPackProductsFilter = [];
    formControls['Ename'].setValue('');
    formControls['brand'].setValue('');
    formControls['model'].setValue('');
    formControls['description'].setValue('');
    formControls['amount'].setValue(null);
    formControls['status'].setValue('');
    formControls['image'].setValue('');
    this.addVisible = true;
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
          console.log(this.addPackProducts);
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
    this.addPackProductsFilter.splice(indexOfText, 1);
    this.addPackProducts = this.addPackProductsFilter;
  }

  sumPrice() {
    this.total = 0;
    let check: Array<any> = [];
    this.addPackProductsFilter.filter((p) => {
      check.push(p);
    });

    check.forEach((item) => {
      this.total += parseFloat(item.price);
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
  }

  //Search
  search() {
    if (this.searchText != '' && this.searchText != null) {
      this.acceptProductService
        .getAcceptProductsSearchV2(this.searchText)
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
    const formControls = this.inputForms.controls;
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
          brand: formControls["brand"].value,
          model: formControls["model"].value,
          description: formControls["description"].value,
          date: new Date(),
          price: formControls["price"].value,
          amount: formControls["amount"].value,
          status: status,
          product: product, //fix this !!!! to array
          image: formControls["image"].value,
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
    const formControls = this.inputForms.controls;
    let status = '';
    let product = this.arrayTextIdProduct.toString();
    if (action === 'SAVE') {
      status = StatusProductToRequestAceept.DRAFT;
    } else if (action === 'APPROVAL') {
      status = StatusProductToRequestAceept.NOT_YET_APPROVED;
    }
    let packProduct: AcceptProduct = {
      id: formControls["id"].value,
      Eid: parseInt(this.accountID),
      Ename: this.accountName,
      brand: formControls["brand"].value,
      model: formControls["model"].value,
      description: formControls["description"].value,
      date: new Date(),
      price: formControls["price"].value,
      amount: formControls["amount"].value,
      status: status,
      product: product, //fix this !!!! to array
      image: formControls["image"].value,
    };
    console.log(packProduct);

    console.log('before');
    this.acceptProductService.updateProductV2(formControls["id"].value, packProduct).subscribe();
    console.log('after');

    setTimeout(() => window.location.reload(), 1000); //ตั้งเวลาเร็วไป service ทำงานไม่ทัน
  }

  // --------------------- Cookie Service ------------------------
  getAccoutDeatial(account: string) {
    return this.cookieService.get(account);
  }
}
