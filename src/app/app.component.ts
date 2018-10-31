import { Component } from '@angular/core';
import {TmdbService} from './tmdb.service';
import {MovieResponse} from './tmdb-data/Movie';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _movies: MovieResponse[] = [];
  private _user: User;
  private dbData: Observable<any>;

  constructor(private tmdb: TmdbService, public anAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.anAuth.user.pipe(filter( u => !!u )).subscribe( u => {
      this._user = u;
      const listsPath = `lists/${u.uid}`;
      const lists = db.list(listsPath);
      this.dbData = lists.valueChanges();
    });
    setTimeout( () =>
      tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .getMovie(13)
          .then( (m: MovieResponse) => console.log('Movie 13:', this._movies.push(m)))
          .catch( err => console.error('Error getting movie:', err) ),
      1000 );
    setTimeout( () =>
      tmdb.init('80d6fe65cffe579d433c3da0f5d11307')
        .getMovie(272)
        .then( (m: MovieResponse) => console.log('Movie 13:', this._movies.push(m)))
        .catch( err => console.error('Error getting movie:', err) ),
      1000 );

  }

  get movies(): MovieResponse[] {
    return this._movies;
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  login() {
    this.anAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.anAuth.auth.signOut();
    this._user = undefined;
  }

  get user(): User {
    return this._user;
  }

  get lists(): Observable<any> {
    return this.dbData;
  }
}
// /yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg
