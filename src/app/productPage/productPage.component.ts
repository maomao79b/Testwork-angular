import { Product } from './../model/model';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { Category, CurrentPath, Position } from '../config/global';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productPage',
  templateUrl: './productPage.component.html',
  styleUrls: ['./productPage.component.css'],
})
export class ProductPageComponent implements OnInit {
  // --------------------- Attribute ------------------------
  inputForms: FormGroup;

  productList: Product[] = [];
  productFilter: Product[] = [];

  searchText: string = '';

  visible: boolean = false;
  editVisible: boolean = false;
  addVisible: boolean = false;

  // id: any;
  // brand: any;
  // model: any;
  // description: any;
  // price: any;
  // amount: any;
  // image: any;
  // category: any;

  position: string | undefined;
  textOwner: string = Position.OWNER;
  textWarehouse: string = Position.WAREHOUSE;

  // --------------------- Function ------------------------
  constructor(
    private service: ProductService,
    private cookieService: CookieService
  ) {
    this.inputForms = new FormGroup({
      id: new FormControl(''),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      category: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getProducts();
    this.position = this.getCookiePosition();
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.PRODUCT_PATH);
  }

  showDialog(id: number) {
    const formControls = this.inputForms.controls;
    this.productFilter.filter((p) => {
      if (p.id === id) {
        formControls['id'].setValue(p.id);
        formControls['brand'].setValue(p.brand);
        formControls['model'].setValue(p.model);
        formControls['description'].setValue(p.description);
        formControls['price'].setValue(p.price);
        formControls['amount'].setValue(p.amount);
        formControls['image'].setValue(p.image);
      }
    });
    this.visible = true;
  }

  showEditDialog(id: string) {
    const formControls = this.inputForms.controls;
    const Pid = parseInt(id);
    this.editVisible = true;
    this.productList.filter((product) => {
      if (product.id == Pid) {
        formControls['id'].setValue(product.id);
        formControls['brand'].setValue(product.brand);
        formControls['model'].setValue(product.model);
        formControls['description'].setValue(product.description);
        formControls['price'].setValue(product.price);
        formControls['amount'].setValue(product.amount);
        formControls['image'].setValue(product.image);
        formControls['category'].setValue(product.category);
      }
    });
  }

  showAddDialog() {
    const formControls = this.inputForms.controls;
    formControls['brand'].setValue('');
    formControls['model'].setValue('');
    formControls['description'].setValue('');
    formControls['price'].setValue(null);
    formControls['amount'].setValue(null);
    formControls['image'].setValue('');
    this.addVisible = true;
  }

  // --------------------- service ------------------------
  //Search
  search(): void {
    if (this.searchText != '' && this.searchText != null) {
      this.service.getSearchV2(this.searchText).subscribe((result: any) => {
        this.productFilter = result;
      });
    } else {
      this.service.getProductsV2().subscribe((result: any) => {
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
  confirmEdit() {
    const formControls = this.inputForms.controls;
    let product: Product = {
      id: formControls['id'].value,
      brand: formControls['brand'].value,
      model: formControls['model'].value,
      description: formControls['description'].value,
      price: formControls['price'].value,
      amount: formControls['amount'].value,
      image: formControls['image'].value,
      category: formControls['category'].value,
    };
    this.service
      .updateProductV2(formControls['id'].value, product)
      .subscribe((result) => {
        console.log(result);
      });
    this.editVisible = false;
    // location.reload();
    setTimeout(() => window.location.reload(), 1000);
  }

  //INSERT
  async insetProduct() {
    const formControls = this.inputForms.controls;
    try {
      let product: Product = {
        id: 0,
        brand: formControls['brand'].value,
        model: formControls['model'].value,
        description: formControls['description'].value,
        price: formControls['price'].value,
        amount: formControls['amount'].value,
        image: formControls['image'].value,
        category: 'NORMAL',
      };

      let response = await this.service.insertProduct(product);
      console.log(response);
      this.addVisible = false;
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  // --------------------- CookieService ------------------------
  getCookiePosition() {
    return this.cookieService.get(Position.POSITION);
  }
}
