import { Component, OnInit } from '@angular/core';
import { Login, Position, CurrentPath } from '../config/global';
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

  // ------------------------------ CookieService --------------------------------
  Logout(){
    // this.cookieServive.set(Login.LoginStatus, Login.LOGOUT);
    // this.cookieServive.set(CurrentPath.CURRENT_PATH, CurrentPath.CUSTOMERS_PATH);
    // this.cookieServive.set(Position.POSITION, Position.POSITION);
    this.cookieServive.deleteAll();
    window.location.reload();
  }

  getCookiePosition(){
    return this.cookieServive.get(Position.POSITION);
  }

}
