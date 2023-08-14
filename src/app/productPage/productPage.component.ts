import { Product } from './../model/model';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { Category, CurrentPath, Position } from '../config/global';

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
  amount: number | undefined;
  image: string | undefined;

  position: string | undefined;
  textOwner: string = Position.OWNER;
  category: string | undefined;

  // --------------------- Function ------------------------
  constructor(private service: ProductService, private cookieService: CookieService) {}

  ngOnInit() {
    this.getProducts();
    this.position = this.getCookiePosition();
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.PRODUCT_PATH);
  }

  showDialog(id: number) {
    this.productFilter.filter((p) => {
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
        this.amount = product.amount;
        this.image = product.image;
      }
    });
  }

  showAddDialog(){
    this.brand = "";
    this.model = "";
    this.description = "";
    this.price = 0;
    this.amount = 0;
    this.image = "";
    this.addVisible = true;
  }

  // --------------------- service ------------------------
  //Search
  search(): void {
    if(this.searchText != "" && this.searchText != null){
      this.service.getSearchV2(this.searchText).subscribe((result: any)=>{
        this.productFilter = result;
      });
    } else {
      this.service.getProductsV2().subscribe((result: any)=>{
        this.productList = result;
        this.productFilter = this.productList;
      });
    }
  }
  //DELETE
  async deleteProduct(Pid: any): Promise<void> {
    Pid = parseInt(Pid);
    const response = await this.service.deleteProduct(Pid);
    setTimeout(() => window.location.reload(), 0);
  }

  // GET
  async getProducts() {
    const response = await this.service.getProducts();
    this.productList = await (<Product[]>response);
    this.productFilter = this.productList;
  }

  //UPDATE
  async confirmEdit() {
    try {
      let product: Product = {
        id: this.id!,
        brand: this.brand!,
        model: this.model!,
        description: this.description!,
        price: this.price!,
        amount: this.amount!,
        category: this.category!,
        image: this.image!
      }
      await this.service.updateProduct(product);
      location.reload()
      this.editVisible = false;
    } catch (error) {
      console.log(error);
    }
  }

  //INSERT
  async insetProduct() {
    try {
      let product: Product = {
        id: 0,
        brand: this.brand!,
        model: this.model!,
        description: this.description!,
        price: this.price!,
        amount: this.amount!,
        category: this.category!,
        image: this.image!
      }

      let response = await this.service.insertProduct(product);
      console.log(response);
      this.addVisible = false;
      location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  // --------------------- CookieService ------------------------
  getCookiePosition(){
    return this.cookieService.get(Position.POSITION);
  }

}
