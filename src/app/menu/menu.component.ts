import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {filter} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {auth, User} from 'firebase';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cursor: string;
  private _user: User;
  private dbData: Observable<any>;
  @Output() changeMenu = new EventEmitter<String>();
  @Output() userLogin = new EventEmitter<User>();

  constructor(public anAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.anAuth.user.pipe(filter( u => !!u )).subscribe( u => {
      this._user = u;
      const listsPath = `lists/${u.uid}`;
      const lists = db.list(listsPath);
      this.dbData = lists.valueChanges();
    });
    this.cursor = 'home';
  }

  ngOnInit() {
  }

  changeToHome() {
    this.cursor = 'home';
    this.changeMenu.emit(this.cursor);
  }

  changeToFilms() {
    this.cursor = 'films';
    this.changeMenu.emit(this.cursor);
  }


  changeToActor() {
    this.cursor = 'actor';
    this.changeMenu.emit(this.cursor);
  }

  changeToPlaylist() {
    this.cursor = 'playlist';
    this.changeMenu.emit(this.cursor);
  }

  changeToAccount() {
    this.cursor = 'account';
    this.changeMenu.emit(this.cursor);
  }

  login() {
    this.anAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.userLogin.emit(this._user);
  }

  logout() {
    this.anAuth.auth.signOut();
    this._user = undefined;
    this.userLogin.emit(this._user);
  }
}
