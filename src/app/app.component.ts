import { Component, OnInit } from '@angular/core';
import { CurrentPath, Login, Position } from './config/global';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shop';

  // ------------- Login Attribute --------------------------------
  LoginStatus: any;
  get login(){
    return this.LoginStatus;
  }
  set login(value: any){
    this.LoginStatus = value;
  }
  // ------------- Position Attribute --------------------------------
  PositionValue: any;
  get position(){
    return this.PositionValue;
  }
  set position(value: any){
    this.PositionValue = value;
  }

  getCookiePosition(): string {
    return this.cookieService.get(Position.POSITION);
  }

  getCookieLogin(): string {
    return this.cookieService.get(Login.LoginStatus);
  }

  setCookieLogin(value: string): void {
    this.cookieService.set(Login.LoginStatus, value);
  }

  constructor(private cookieService: CookieService, private router: Router) {
    this.login = this.getCookieLogin();
    this.position = this.getCookiePosition()
    if(this.login === Login.LOGIN){
      if(this.position === Position.OWNER || this.position === Position.SALER){
        let currentPath = this.cookieService.get(CurrentPath.CURRENT_PATH);
        this.router.navigate([currentPath]);
      }
    }
  }

  ngOnInit() {

  }

}
