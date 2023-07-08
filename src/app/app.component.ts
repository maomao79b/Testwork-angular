import { Component, OnInit } from '@angular/core';
import { Tabmenu } from './config/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shop';
  currentTab: string = "";

  get currentTabMenu(){
    return this.currentTab;
  }
  set currentTabMenu(value: string){
    this.currentTab = value;
  }

  constructor() { }

  ngOnInit() {
    this.currentTab = Tabmenu.CURRENT_TAB;
  }

}
