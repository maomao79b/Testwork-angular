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
    await this.getLogin(this.username!, this.password!);

    if (this.employee.length === 1) {
      this.employee.forEach((element) => {
        let position = element.position.toUpperCase();
        if (position === Position.OWNER) {
          this.setCookiePosition(Position.OWNER);
        } else if (position === Position.SALER) {
          this.setCookiePosition(Position.SALER);
        } else if (position === Position.WAREHOUSE) {
          this.setCookiePosition(Position.WAREHOUSE);
        }
        this.setCookieAccount(element.id.toString(), element.name);
        this.setCookieLogin();
        this.setCurrentPath();
        window.location.reload();
      });
    } else {
      alert('username หรือ password ไม่ถูกต้อง');
    }
  }

  //-------------------- service --------------------
  //GET
  async getLogin(username: string, password: string): Promise<void> {
    const response = await this.service.getLogin(username, password);
    this.employee = await (<Employee[]>response);
  }
}
