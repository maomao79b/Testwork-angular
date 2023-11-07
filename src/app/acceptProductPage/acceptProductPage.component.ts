import { Component, OnInit } from '@angular/core';
import { AcceptProductService } from '../service/acceptProduct/acceptProduct.service';
import { AcceptProduct, Product, UpdateStatusAccept } from 'src/app/model/model';
import { ProductService } from '../service/product/product.service';
import { CookieService } from 'ngx-cookie-service';
import { Category, CurrentPath, StatusProductToRequestAceept } from '../config/global';
@Component({
  selector: 'app-acceptProductPage',
  templateUrl: './acceptProductPage.component.html',
  styleUrls: ['./acceptProductPage.component.css'],
})
export class AcceptProductPageComponent implements OnInit {
  //----------------------- Attribute ----------------------------------------------------
  acceptProductList: AcceptProduct[] = [];
  acceptProductFilter: AcceptProduct[] = [];
  productsList: Product[] = [];
  productsFilter: Product[] = [];

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
  product: string[] = [];
  //-------------------------------------------------------------------------------
  constructor(private serviceAccept: AcceptProductService, private serviceProduct: ProductService, private cookieService: CookieService) {}

  async ngOnInit(): Promise<void> {
    this.getProducts();
    const response = await this.serviceAccept.getAcceptProductsConfirm();
    this.acceptProductList = <AcceptProduct[]>response;
    this.acceptProductFilter = this.acceptProductList;
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.ACCEPTPRODUCTS_PATH)
  }
  searchText: string = '';

  showDialog(id: number){
    this.productsFilter = [];
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
        this.product = p.product.split(',');
        this.image = p.image;
      }
    })
    for (let numId of this.product){
      let newNum = parseInt(numId)
      for (let p of this.productsList){
        if(newNum === p.id){
          this.productsFilter.push(p);
        }
      }
    }
    this.visible = true;
  }


  //----------------------- services --------------------
  //Search
  search() {
    if(this.searchText != "" && this.searchText != null){
      this.serviceAccept.getAcceptProductsSearchV2(this.searchText).subscribe((result: any)=>{
        console.log(result);
        this.acceptProductFilter = result;
      });
    } else {
      this.serviceAccept.getAcceptProductsConfirmV2().subscribe((result: any)=>{
        this.acceptProductList = result;
        this.acceptProductFilter = this.acceptProductList;
      });
    }
  }
  // Update DISAPPROVAL
  async disAcceptProduct(id: any): Promise<void> {
    id = parseInt(id);
    let update: UpdateStatusAccept = {
      id: id,
      status: StatusProductToRequestAceept.DISAPPROVAL
    }
    await this.serviceAccept.updateStatus(id, update);
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
        category: Category.SET,
        image: this.image!
      }
      let update: UpdateStatusAccept = await {
        id: parseInt(id),
        status: StatusProductToRequestAceept.APPROVED
      }
      await this.serviceProduct.insertProduct(product);
      await this.serviceAccept.updateStatus(id, update);
      location.reload();
      // this.deleteAcceptProduct(id);
    } catch (error) {
      console.log(error);
    }
  }

  //GET PRODUCT
  async getProducts() {
    const response = await this.serviceProduct.getProducts();
    this.productsList = await (<Product[]>response);
  }

  // --------------------- Cookie Service ------------------------
  getAccoutDeatial(account: string){
    return this.cookieService.get(account)
  }

}
