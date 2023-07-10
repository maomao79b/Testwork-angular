import { Component, OnInit } from '@angular/core';
import { Login, Tabmenu } from '../config/global';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookieServive: CookieService) { }

  ngOnInit() {

  }

  ChangeTab(tabName: string){
    Tabmenu.CURRENT_TAB = tabName;
    console.log(Tabmenu.CURRENT_TAB);
  }

  Logout(){
    this.cookieServive.set(Login.LoginStatus, Login.LOGOUT);
    window.location.reload();
  }

}
