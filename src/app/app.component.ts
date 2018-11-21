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
import {Firebase2Service} from './firebase2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private _movies: MovieResponse[] = [];
   _user: User;
  private dbData: Observable<any>;
   cursor: String;
  private acteurs;
  fs: FirebaseService;

  constructor(private tmdb: TmdbService, public anAuth: AngularFireAuth, private db: AngularFireDatabase, private fb: Firebase2Service) {
    this.anAuth.user.pipe(filter( u => !!u )).subscribe( u => {
      this._user = u;
      console.log('Firebase uid ' + u.uid);
      this.fs = new FirebaseService(this._user, this.tmdb);
      console.log('app ' + this.fs);
      this.fb.setUser(this.user);
      this.fb.setTmbd(this.tmdb);
      this.fb.getPlaylist().then(res => {console.log("Start"); console.log(res.val()); console.log("Stop"); });
    });

    setTimeout( () =>
        this.tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .getTrendingPerson()
          .then( (a: SearchPeopleResponse) => this.acteurs = a.results)
          .catch( err => console.error('Error getting actor:', err) ),
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
    if (e === 'actor'){

    }
    this.cursor = e;
  }

  changeUser(e) {
    // this._user = e;
    this._user = undefined;
    this.fs = new FirebaseService(this._user, this.tmdb);
    location.reload();
  }

  ngOnInit() {
    this.fs = new FirebaseService(this._user, this.tmdb);
  }




}
// /yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg
