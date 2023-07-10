import { Component, OnInit } from '@angular/core';
import { Product } from '../model/model';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-productPage',
  templateUrl: './productPage.component.html',
  styleUrls: ['./productPage.component.css'],
})
export class ProductPageComponent implements OnInit {

  productList: Product[] = [];
  productFilter: Product[] = [];

  searchText: string = '';

  visible: boolean = false;
  editVisible: boolean = false;

  id: number | undefined;
  brand: string | undefined;
  model: string | undefined;
  description: string | undefined;
  price: number | undefined;
  image: string | undefined;

  constructor(private service: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  showDialog(id: number) {
    this.productFilter.filter(p => {
      if(p.id === id){
        this.id = p.id;
        this.brand = p.brand;
        this.model = p.model;
        this.description = p.description;
        this.price = p.price;
        this.image = p.image;
      }
    })
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
        this.price = product.price;
        this.image = product.image;
      }
    });
  }

  search(): void {
    this.productFilter = this.productList.filter((product) => {
      return (
        product.id
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

  async getProducts(){
    const response = await this.service.getProducts();
    this.productList = await <Product[]>response;
    this.productFilter = this.productList;
  }
}
