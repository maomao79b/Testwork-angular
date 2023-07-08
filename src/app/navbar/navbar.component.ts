import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tabmenu } from '../config/global';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  ChangeTab(tabName: string){
    Tabmenu.CURRENT_TAB = tabName;
    console.log(Tabmenu.CURRENT_TAB);
  }

}
