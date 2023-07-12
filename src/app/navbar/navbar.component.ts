import { Component, OnInit } from '@angular/core';
import { Login, Position, Tabmenu } from '../config/global';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookieServive: CookieService) { }

  position: string | undefined;
  textOwner: string = Position.OWNER;
  textSaler: string = Position.SALER;
  textWarehouse: string = Position.WAREHOUSE;

  ngOnInit() {
    this.position = this.getCookiePosition();
  }

  ChangeTab(tabName: string){
    Tabmenu.CURRENT_TAB = tabName;
    console.log(Tabmenu.CURRENT_TAB);
  }

  // ------------------------------ CookieService --------------------------------
  Logout(){
    this.cookieServive.set(Login.LoginStatus, Login.LOGOUT);
    window.location.reload();
  }

  getCookiePosition(){
    return this.cookieServive.get(Position.POSITION);
  }

}
