import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CurrentPath } from '../config/global';

@Component({
  selector: 'app-reportPage',
  templateUrl: './reportPage.component.html',
  styleUrls: ['./reportPage.component.css']
})
export class ReportPageComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieService.set(CurrentPath.CURRENT_PATH, CurrentPath.REPORT_PATH);
  }

}
