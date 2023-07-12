import { Component, OnInit } from '@angular/core';
import { Product } from '../model/model';
import { ProductService } from '../service/product/product.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentPath } from '../config/global';

@Component({
  selector: 'app-packProduct',
  templateUrl: './packProduct.component.html',
  styleUrls: ['./packProduct.component.css']
})
export class PackProductComponent implements OnInit {
  productList: Product[] = [];
  productFilter: Product[] = [];

  searchText: string = '';

  visible: boolean = false;

  id: number | undefined;
  brand: string | undefined;
  model: string | undefined;
  description: string | undefined;
  price: number | undefined;
  image: string | undefined;

  constructor(private service: ProductService, private cookieService: CookieService) {}

  ngOnInit() {
    // this.getProducts();
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.PACKPRODUCT_PATH)
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
  }

  addProduct(): void {
    // this.productFilter = this.productList.filter((product) => {
    //   return (
    //     product.id
    //       .toString()
    //       .toLocaleLowerCase()
    //       .includes(this.searchText.toLowerCase()) ||
    //     product.price
    //       .toString()
    //       .toLocaleLowerCase()
    //       .includes(this.searchText.toLowerCase()) ||
    //     product.brand
    //       .toLocaleLowerCase()
    //       .includes(this.searchText.toLowerCase()) ||
    //     product.model
    //       .toLocaleLowerCase()
    //       .includes(this.searchText.toLowerCase()) ||
    //     product.description
    //       .toLocaleLowerCase()
    //       .includes(this.searchText.toLowerCase())
    //   );
    // });
  }

  // --------------------- service ------------------------

  //INSERT
  async insetProduct() {
    try {
      // await this.service.insertProduct(
      //   this.brand,
      //   this.model,
      //   this.description,
      //   this.price,
      //   this.image
      // );
      setTimeout(() => window.location.reload(), 0);
    } catch (error) {
      console.log(error);
    }
  }

}
