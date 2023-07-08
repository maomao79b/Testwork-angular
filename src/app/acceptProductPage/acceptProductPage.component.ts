import { Component, OnInit } from '@angular/core';
import { AcceptProductServiceService } from '../service/acceptProduct/acceptProductService.service';
import { AcceptProduct } from 'src/app/model/model';
@Component({
  selector: 'app-acceptProductPage',
  templateUrl: './acceptProductPage.component.html',
  styleUrls: ['./acceptProductPage.component.css'],
})
export class AcceptProductPageComponent implements OnInit {
  acceptProductList: AcceptProduct[] = [];
  acceptProductFilter: AcceptProduct[] = [];

  constructor(private service: AcceptProductServiceService) {}

  async ngOnInit(): Promise<void> {
    const response = await this.service.getAcceptProducts();
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

  async deleteAcceptProduct(id: any): Promise<void> {
    id = parseInt(id);
    const response = await this.service.deleteAcceptProduct(id);
    this.acceptProductFilter = this.acceptProductList.filter((accept) => {
      return accept.id !== id;
    });
  }
}
