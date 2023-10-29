import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { FormsModule  } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CookieService } from 'ngx-cookie-service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomerPageComponent } from './customerPage/customerPage.component';
import { EmployeePageComponent } from './employeePage/employeePage.component';
import { AcceptProductPageComponent } from './acceptProductPage/acceptProductPage.component';
import { ReportPageComponent } from './reportPage/reportPage.component';
import { ProductPageComponent } from './productPage/productPage.component';
import { InputTextModule } from 'primeng/inputtext';
import { LoginPageComponent } from './login/loginPage/loginPage.component';
import { PackProductComponent } from './packProduct/packProduct.component';
import { CarouselModule } from 'primeng/carousel';
import { SalePageComponent } from './salePage/salePage.component';


const appRoute: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'customer', component: CustomerPageComponent},
  {path: 'employee', component: EmployeePageComponent},
  {path: 'acceptProduct', component: AcceptProductPageComponent},
  {path: 'report', component: ReportPageComponent},
  {path: 'product', component: ProductPageComponent},
  {path: 'packproduct', component: PackProductComponent},
  {path: 'sale', component: SalePageComponent},

];
@NgModule({
  declarations: [
    AppComponent,
      NavbarComponent,
      CustomerPageComponent,
      EmployeePageComponent,
      AcceptProductPageComponent,
      ReportPageComponent,
      ProductPageComponent,
      LoginPageComponent,
      PackProductComponent,
      SalePageComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    RouterModule.forRoot(
      appRoute,{enableTracing:false}
    ),
    TableModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    CardModule,
    InputTextareaModule,
    CarouselModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    CommonModule,
    TagModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
