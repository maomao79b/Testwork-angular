import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Account, CurrentPath, Login, Position } from 'src/app/config/global';
import { Employee } from 'src/app/model/model';
import { EmployeeServiceService } from 'src/app/service/employee/employeeService.service';

@Component({
  selector: 'app-loginPage',
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.css'],
})
export class LoginPageComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  employee: Employee[] = [];

  @Output() onLogin = new EventEmitter();

  constructor(
    private service: EmployeeServiceService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    console.log(Login.LoginStatus);
  }

  // ------------ Settings Cookie ------------
  setCookiePosition(position: string) {
    this.cookieService.set(Position.POSITION, position);
  }
  setCookieLogin() {
    this.cookieService.set(Login.LoginStatus, Login.LOGIN);
  }
  setCookieAccount(id: string, name: string){
    this.cookieService.set(Account.ACCOUNT_ID, id);
    this.cookieService.set(Account.ACCOUNT_NAME, name);
  }
  setCurrentPath(){
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.CUSTOMERS_PATH);
  }


  // ---------------- Functions --------------------------------
  async checkPassword() {
    let login: Login = {
      username: this.username,
      password: this.password
    }
    await this.getLogin(login!);
  }

  //-------------------- service --------------------
  //GET
  async getLogin(login: Login): Promise<void> {
    await this.service.getLogin(login).subscribe((result:any)=>{

      console.log(result != null);
      console.log(result.position);

      if (result != null) {
        let position = result.position.toUpperCase();
        if (position === Position.OWNER) {
          this.setCookiePosition(Position.OWNER);
        } else if (position === Position.SALER) {
          this.setCookiePosition(Position.SALER);
        } else if (position === Position.WAREHOUSE) {
          this.setCookiePosition(Position.WAREHOUSE);
        }
        this.setCookieAccount(result.id.toString(), result.name);
        this.setCookieLogin();
        this.setCurrentPath();
        window.location.reload();
      } else {
        alert('username หรือ password ไม่ถูกต้อง');
      }
    });
  }
}
