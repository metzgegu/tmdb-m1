import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TmdbService} from "../tmdb.service";
import {MovieResult} from "../tmdb-data/searchMovie";
import {MovieResponse} from "../tmdb-data/Movie";
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.css']
})
export class FilmInfoComponent implements OnInit {

  @Input() film: MovieResponse;
  @Output() exitEmitter = new EventEmitter<any>();
  public loading = true;

  constructor(private tmdb: TmdbService, private fs: FirebaseService) { }

  ngOnInit() {
    setTimeout( () =>
        this.tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .getMovie(this.film.id)
          .then( (m: MovieResponse) => {
            this.film.genres = m.genres;
            this.loading = false;
          })
          .catch( err => console.error('Error getting movie:', err) ),
      1000 );
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  exit() {
    this.exitEmitter.emit();
  }

  isGold(number: number) {
    return number <= this.film.vote_average / 2;
  }
}

/*

setTimeout( () =>
        this.tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .getMovie(this.film.id)
          .then( (m: MovieResponse) => this.film1 = m)
          .catch( err => console.error('Error getting movie:', err) ),
      1000 );
 */
