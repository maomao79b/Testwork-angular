import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/config/global';
import { Employee } from 'src/app/model/model';
import { EmployeeServiceService } from 'src/app/service/employee/employeeService.service';

@Component({
  selector: 'app-loginPage',
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  employee: Employee[] = [];

  @Output() onLogin = new EventEmitter();

  constructor(private service: EmployeeServiceService, private cookieService: CookieService) { }

  ngOnInit() {
    console.log(Login
      .LoginStatus)
  }

  async checkPassword(){
    await this.getLogin(this.username!, this.password!);

    if(this.employee.length === 1){
      this.cookieService.set(Login.LoginStatus, Login.LOGIN);
      window.location.reload();
    }else{
      alert("username หรือ password ไม่ถูกต้อง");
    }
  }
  //-------------------- service --------------------
  //GET
  async getLogin(username: string, password: string): Promise<void>{
    const response = await this.service.getLogin(username, password);
    this.employee = await (<Employee[]>response);
  }
}
