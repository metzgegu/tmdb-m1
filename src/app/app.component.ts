import {Component, OnInit} from '@angular/core';
import {TmdbService} from './tmdb.service';
import {MovieResponse} from './tmdb-data/Movie';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {filter} from 'rxjs/operators';
import {PersonResponse} from './tmdb-data/Person';
import {SearchPeopleResponse} from './tmdb-data/SearchPeople';
import {FirebaseService} from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _movies: MovieResponse[] = [];
   _user: User;
  private dbData: Observable<any>;
   cursor: String;


  constructor(private tmdb: TmdbService, private db: AngularFireDatabase, private fs: FirebaseService) {
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
    setTimeout( () =>
        tmdb.init('80d6fe65cffe579d433c3da0f5d11307')
          .getMovie(260513)
          .then( (m: MovieResponse) => console.log('Movie 13:', this._movies.push(m)))
          .catch( err => console.error('Error getting movie:', err) ),
      1000 );


    this.cursor = 'home';
  }

  get movies(): MovieResponse[] {
    return this._movies;
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }


  get user(): User {
    return this._user;
  }

  get lists(): Observable<any> {
    return this.dbData;
  }


  changeDisplay(e) {
    if (e === 'actor') {

    }
    this.cursor = e;
  }

  changeUser(e) {
    // this._user = e;
    this._user = undefined;
    // this.fs = new FirebaseService(this._user, this.tmdb);
    location.reload();
  }

  ngOnInit() {
    // this.fs = new FirebaseService(this._user, this.tmdb);
  }




}
// /yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg
