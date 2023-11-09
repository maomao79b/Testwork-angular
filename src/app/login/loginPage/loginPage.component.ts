import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login as getLogin } from './../../model/model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { Account, CurrentPath, Login, Position, Token } from 'src/app/config/global';
import { Employee } from 'src/app/model/model';
import { EmployeeServiceService } from 'src/app/service/employee/employeeService.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-loginPage',
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.css'],
})
export class LoginPageComponent implements OnInit {
  inputForms: FormGroup;
  // username: string | undefined;
  // password: string | undefined;
  employee: Employee[] = [];

  @Output() onLogin = new EventEmitter();

  constructor(
    private service: EmployeeServiceService,
    private cookieService: CookieService,
  ) {
    this.inputForms = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

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
  setCookieAccount(id: string, name: string) {
    this.cookieService.set(Account.ACCOUNT_ID, id);
    this.cookieService.set(Account.ACCOUNT_NAME, name);
  }
  setCookieToken(token: string) {
    const cookieOptions: CookieOptions = {
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),  // 24 ชั่วโมง
      path: '/',
      secure: true,
      sameSite: 'Lax'
    };
    this.cookieService.set(Token, token, cookieOptions);
  }
  setCurrentPath() {
    this.cookieService.set(
      CurrentPath.CURRENT_PATH,
      CurrentPath.CUSTOMERS_PATH
    );
  }

  // ---------------- Functions --------------------------------
  async checkPassword() {
    const formControls = this.inputForms.controls;
    let login: getLogin = {
      username: formControls['username'].value,
      password: formControls['password'].value,
    };
    await this.getLogin(login);
  }

  //-------------------- service --------------------
  //GET
  async getLogin(login: getLogin): Promise<void> {
    await this.service.getLogin(login).subscribe(
      (result: any) => {
        this.setCookieToken(result.token);
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
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // จัดการกรณี API ส่งคืน Unauthorized
          alert('username หรือ password ไม่ถูกต้อง');
          // ทำสิ่งที่คุณต้องการ เช่น ให้ผู้ใช้เข้าสู่ระบบใหม่, แสดงข้อความ, หรือทำการ redirect ไปยังหน้า login
        } else {
          // กรณี error อื่น ๆ
          console.error(error);
        }
      }
    );
  }
}
