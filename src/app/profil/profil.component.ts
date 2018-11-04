import { Component, OnInit, Input } from '@angular/core';
import {User} from 'firebase';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  @Input()
  user: User ;

  constructor() {

  }

  ngOnInit() {
  }

  getUser() {
    return this.user;
  }
}
