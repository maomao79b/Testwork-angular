import { Component, OnInit } from '@angular/core';
import { AcceptProductService } from '../service/acceptProduct/acceptProduct.service';
import { AcceptProduct, Product } from 'src/app/model/model';
import { ProductService } from '../service/product/product.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentPath } from '../config/global';
@Component({
  selector: 'app-acceptProductPage',
  templateUrl: './acceptProductPage.component.html',
  styleUrls: ['./acceptProductPage.component.css'],
})
export class AcceptProductPageComponent implements OnInit {
  //----------------------- Attribute ----------------------------------------------------
  acceptProductList: AcceptProduct[] = [];
  acceptProductFilter: AcceptProduct[] = [];

  visible: boolean = false;

  id: number | undefined;
  Eid: number | undefined;
  Ename: string | undefined;
  brand: string | undefined;
  model: string | undefined;
  description: string | undefined;
  price: number | undefined;
  amount: number | undefined;
  image: string | undefined;


  //-------------------------------------------------------------------------------
  constructor(private serviceAccept: AcceptProductService, private serviceProduct: ProductService, private cookieService: CookieService) {}

  async ngOnInit(): Promise<void> {
    const response = await this.serviceAccept.getAcceptProducts();
    this.acceptProductList = <AcceptProduct[]>response;
    this.acceptProductFilter = this.acceptProductList;
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.PACKPRODUCT_PATH)
  }
  searchText: string = '';

  // เพิ่ม amount
  search(): void {
    this.acceptProductFilter = this.acceptProductList.filter((acceptPoduct) => {
      console.log(this.searchText);
      return (
        acceptPoduct.id
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        acceptPoduct.Ename
          .toLocaleLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }

  showDialog(id: number){
    this.acceptProductList.filter(p => {
      if(p.id === id){
        this.id = p.id;
        this.Eid = p.Eid;
        this.Ename = p.Ename;
        this.brand = p.brand;
        this.model = p.model;
        this.description = p.description;
        this.price = p.price;
        this.amount = p.amount;
        this.image = p.image;
      }
    })
    this.visible = true;
  }


  //----------------------- services --------------------
  //DELETE
  async deleteAcceptProduct(id: any): Promise<void> {
    id = parseInt(id);
    await this.serviceAccept.deleteAcceptProduct(id);
    window.location.reload();
  }

  //INSERT
  async insetProduct(id: any) {
    try {
      id = parseInt(id);
      this.acceptProductList.filter(p => {
        if(p.id === id){
          this.brand = p.brand;
          this.model = p.model;
          this.description = p.description;
          this.price = p.price;
          this.amount = p.amount;
          this.image = p.image;
        }
      })
      let product: Product = await {
        id: 0,
        brand: this.brand!,
        model: this.model!,
        description: this.description!,
        price: this.price!,
        amount: this.amount!,
        image: this.image!
      }
      console.log("0");
      await this.serviceProduct.insertProduct(product);
      console.log("1");
      this.deleteAcceptProduct(id);
    } catch (error) {
      console.log(error);
    }
  }

}
