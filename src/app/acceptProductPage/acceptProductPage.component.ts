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
  acceptProductList: AcceptProduct[] = [];
  acceptProductFilter: AcceptProduct[] = [];

  constructor(private serviceAccept: AcceptProductService, private serviceProduct: ProductService) {}

  async ngOnInit(): Promise<void> {
    const response = await this.serviceAccept.getAcceptProducts();
    this.acceptProductList = <AcceptProduct[]>response;
    this.acceptProductFilter = this.acceptProductList;
    console.log(this.acceptProductList);
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

  //DELETE
  async deleteAcceptProduct(id: any): Promise<void> {
    id = parseInt(id);
    await this.serviceAccept.deleteAcceptProduct(id);
    this.acceptProductFilter = this.acceptProductList.filter((accept) => {
      return accept.id !== id;
    });
  }



  //POST TO PRODUCT
  async insertToProduct(id: any, name: string, description: string, price: string, image: string): Promise<void> {
    await this.serviceProduct.insertProduct(name, description, price, image);
    await this.deleteAcceptProduct(id);
  }

}
