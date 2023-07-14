import { Component, OnInit } from '@angular/core';
import { PackProducts, Product } from '../model/model';
import { ProductService } from '../service/product/product.service';
import { CookieService } from 'ngx-cookie-service';
import { Account, Category, CurrentPath } from '../config/global';
import { PackProductsService } from '../service/packProducts/packProducts.service';

@Component({
  selector: 'app-packProduct',
  templateUrl: './packProduct.component.html',
  styleUrls: ['./packProduct.component.css'],
})
export class PackProductComponent implements OnInit {
  packProductList: PackProducts[] = [];
  packProductFilter: PackProducts[] = [];
  addPackProducts: Product[] = [];
  addPackProductsFilter: Product[] = [];

  searchText: string = '';
  addProductText: string = '';

  visible: boolean = false;
  addVisible: boolean = false;

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

  constructor(
    private productService: ProductService,
    private cookieService: CookieService,
    private packProductsService: PackProductsService
  ) {}

  search(): void {
    this.packProductFilter = this.packProductList.filter((packProduct) => {
      return (
        packProduct.id
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        packProduct.Ename
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        packProduct.date
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        packProduct.status
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        packProduct.price
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        packProduct.brand
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        packProduct.model
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        packProduct.description
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
    // console.log(this.searchText);
  }
  ngOnInit() {
    this.getPackProducts();
    this.cookieService.set(
      CurrentPath.CURRENT_PATH,
      CurrentPath.PACKPRODUCT_PATH
    );
  }

  showDialog(id: number) {
    this.packProductFilter.filter((p) => {
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
    this.visible = true;
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
    this.description = '';
    this.status = '';
    this.image = '';
    this.addVisible = true;
  }

  async addProduct() {
    if (this.addProductText != '') {
      const newProduct = await this.productService.getProductsById(
        this.addProductText
      );
      let newproduct: Product = <Product>newProduct;
      let objLength = Object.values(newproduct).length;
      if (objLength > 0) {
        this.addPackProducts.push(newproduct);
        this.addPackProductsFilter = this.addPackProducts.slice();
        this.sumPrice();
      } else {
        console.log('Length: ', objLength);
      }
    }
  }

  deleteItem(id: string, price: number) {
    this.total -= price;
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
          console.log(c.id);
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

  // --------------------- service ------------------------

  //GET
  async getPackProducts() {
    const response = await this.packProductsService.getPackProducts();
    this.packProductList = <PackProducts[]>response;
    this.packProductFilter = this.packProductList;
  }

  //GET
  async getPackProductsById(id: string) {
    const response = await this.productService.getProductsById(id);
    return response;
  }

  //INSERT INTO PACK_PRODUCT
  async savePackProduct(){

  }

  //INSERT IN TO ACCRPTPRODUCT
  async insetProduct() {
    try {
      console.log(new Date());
      let packProduct: PackProducts = {
        id: 0,
        Eid: parseInt(Account.ACCOUNT_ID),
        Ename: Account.ACCOUNT_NAME,
        brand: this.brand!,
        model: this.model!,
        description: this.description!,
        date: new Date(),
        price: this.price!,
        amount: this.amount!,
        status: Category.SET,
        image: this.image!
      }
      let respponse = await this.packProductsService.insertPackProducts(packProduct);
      console.log(respponse);
      setTimeout(() => window.location.reload(), 0);
    } catch (error) {
      console.log(error);
    }
  }
}
