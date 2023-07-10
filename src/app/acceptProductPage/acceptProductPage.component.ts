import { Component, OnInit } from '@angular/core';
import { AcceptProductService } from '../service/acceptProduct/acceptProduct.service';
import { AcceptProduct, Product } from 'src/app/model/model';
import { ProductService } from '../service/product/product.service';
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
  image: string | undefined;


  //-------------------------------------------------------------------------------
  constructor(private serviceAccept: AcceptProductService, private serviceProduct: ProductService) {}

  async ngOnInit(): Promise<void> {
    const response = await this.serviceAccept.getAcceptProducts();
    this.acceptProductList = <AcceptProduct[]>response;
    this.acceptProductFilter = this.acceptProductList;
  }
  searchText: string = '';

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

  //POST TO PRODUCT
  async insertToProduct(id: any, brand: string, model: string, description: string, price: string, image: string): Promise<void> {
    await this.serviceProduct.insertProduct(brand, model, description, price, image);
    await this.deleteAcceptProduct(id);
    window.location.reload();
  }

}
