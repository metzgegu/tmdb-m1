import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cursor: string;

  constructor() {
    this.cursor = 'home';
  }

  ngOnInit() {
  }

  changeToHome() {
    this.cursor = 'home';
  }

  changeToFilms() {
    this.cursor = 'films';
  }


  changeToActor() {
    this.cursor = 'actor';
  }

  changeToAccount() {
    this.cursor = 'account';
  }
}
