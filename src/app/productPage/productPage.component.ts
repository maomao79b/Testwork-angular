import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/model';
import { ProductService } from '../service/product/product.service';
import { Position } from '../config/global';

@Component({
  selector: 'app-productPage',
  templateUrl: './productPage.component.html',
  styleUrls: ['./productPage.component.css'],
})
export class ProductPageComponent implements OnInit {
  // --------------------- Attribute ------------------------
  productList: Product[] = [];
  productFilter: Product[] = [];

  searchText: string = '';

  visible: boolean = false;
  editVisible: boolean = false;
  addVisible: boolean = false;

  id: number | undefined;
  brand: string | undefined;
  model: string | undefined;
  description: string | undefined;
  price: number | undefined;
  image: string | undefined;

  position: string | undefined;
  textOwner: string = Position.OWNER;

  // --------------------- Function ------------------------
  constructor(private service: ProductService, private cookieService: CookieService) {}

  ngOnInit() {
    this.getProducts();
    this.position = this.getCookiePosition();
  }

  showDialog(id: number) {
    this.productFilter.filter((p) => {
      if (p.id === id) {
        this.id = p.id;
        this.brand = p.brand;
        this.model = p.model;
        this.description = p.description;
        this.price = p.price;
        this.image = p.image;
      }
    });
    this.visible = true;

    // let ss = {
    //   "employees":["John", "Anna", "Peter"]
    //   }
    // let ss2 = JSON.parse(ss);
    // let ss3 = JSON.stringify(ss);
    // let ss4 = JSON.parse(ss3);
    // console.log("Encode : ",ss2);
    // console.log("Decode : ",);
  }

  showEditDialog(id: string) {
    const Pid = parseInt(id);
    this.editVisible = true;
    this.productList.filter((product) => {
      if (product.id == Pid) {
        this.id = product.id;
        this.brand = product.brand;
        this.model = product.model;
        this.description = product.description;
        this.price = product.price;
        this.price = product.price;
        this.image = product.image;
      }
    });
  }

  showAddDialog(){
    this.brand = "";
    this.model = "";
    this.description = "";
    this.price = undefined;
    this.image = "";
    this.addVisible = true;
  }

  search(): void {
    this.productFilter = this.productList.filter((product) => {
      return (
        product.id
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        product.price
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        product.brand
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        product.model
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        product.description
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }

  // --------------------- service ------------------------
  //DELETE
  async deleteProduct(Pid: any): Promise<void> {
    Pid = parseInt(Pid);
    const response = await this.service.deleteProduct(Pid);
    setTimeout(() => window.location.reload(), 0);
  }

  //GET
  async getProducts() {
    const response = await this.service.getProducts();
    this.productList = await (<Product[]>response);
    this.productFilter = this.productList;
  }

  //UPDATE
  async confirmEdit() {
    try {
      await this.service.updateProduct(
        this.id!,
        this.brand!,
        this.model!,
        this.description!,
        this.price!,
        this.image!
      );
      setTimeout(() => window.location.reload(), 0);
      this.editVisible = false;
    } catch (error) {
      console.log(error);
    }
  }

  //INSERT
  async insetProduct() {
    try {
      await this.service.insertProduct(
        this.brand,
        this.model,
        this.description,
        this.price,
        this.image
      );
      setTimeout(() => window.location.reload(), 0);
      this.addVisible = false;
    } catch (error) {
      console.log(error);
    }
  }

  // --------------------- CookieService ------------------------
  getCookiePosition(){
    return this.cookieService.get(Position.POSITION);
  }

}
