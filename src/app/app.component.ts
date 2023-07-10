import { Component, OnInit } from '@angular/core';
import { Login } from './config/global';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shop';
  LoginStatus: any;

  get login(){
    return this.LoginStatus;
  }
  set login(value: any){
    this.LoginStatus = value;
  }

  // เข้าถึงค่าคุกกี้
  getCookieValue(): string {
    return this.cookieService.get(Login.LoginStatus);
  }

  // ตั้งค่าคุกกี้
  setCookieValue(value: string): void {
    this.cookieService.set(Login.LoginStatus, value);
  }

  // ลบคุกกี้
  deleteCookie(): void {
    this.cookieService.delete(Login.LoginStatus);
  }

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.login = this.getCookieValue();
  }

}
