import { Component, OnInit } from '@angular/core';
import { Login, Position, CurrentPath, Account } from '../config/global';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeServiceService } from '../service/employee/employeeService.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookieServive: CookieService, private employeeService: EmployeeServiceService) { }

  position: string | undefined;
  textOwner: string = Position.OWNER;
  textSaler: string = Position.SALER;
  textWarehouse: string = Position.WAREHOUSE;
  items: any;
  accountName: string = "";
  profileImage: string = "";

  ngOnInit() {
    this.getProfileImage();
    this.position = this.getCookiePosition();
    this.accountName = this.getCookieAccountName();
    this.items = [
      {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
              this.Logout();
          }
        }
  ];
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

  getCookieAccountName(){
    return this.cookieServive.get(Account.ACCOUNT_NAME);
  }

  getCookieAccountId(){
    return this.cookieServive.get(Account.ACCOUNT_ID);
  }

  getProfileImage(){
    this.employeeService.getImageEmployeesV2Byid(this.getCookieAccountId()).subscribe((result: any)=>{
      this.profileImage = result.image;
    });
  }

}
