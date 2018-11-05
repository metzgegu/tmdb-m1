import {Component, Input, OnInit,} from '@angular/core';
import {MovieResult} from '../tmdb-data/searchMovie';
import {MovieResponse} from '../tmdb-data/Movie';
import {FirebaseService} from '../firebase.service';
import {MoviesList} from '../playlist/MoviesList';
import {isUndefined} from 'util';


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  @Input() fs: FirebaseService;
  @Input() movies: MovieResponse[];
  @Input() numberOfFilmTOShow;
  slicedMovies: MovieResponse[];
  private rawPlaylists: JSON;
  public playlists: MoviesList[] = [];
  filmClicked ;
  filmIsCLicked = false;
  canBeMore;
  expansed = false;
  cursor;

  constructor() {
    //console.log(this.movies);

  }

  ngOnInit() {
    this.canBeMore = false;
    // console.log('Film-list ' + this.fs);
    if (this.numberOfFilmTOShow !== undefined) {
      this.slicedMovies = this.movies.slice(0, this.numberOfFilmTOShow);
      this.cursor = 0;
      this.canBeMore = true;
    }
    console.log(this.numberOfFilmTOShow);
  }

  clickOnFilm(e) {
    this.filmClicked = e;
    this.filmIsCLicked = true;
  }

  exitInfo() {
    this.filmIsCLicked = false;
  }

  expanse() {

    this.slicedMovies = this.movies.slice(this.cursor, this.cursor + this.numberOfFilmTOShow);
    if (this.cursor + this.numberOfFilmTOShow > this.movies.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor += this.cursor + this.numberOfFilmTOShow;
    }
    /*this.expansed = ! this.expansed;
    if (this.expansed) {
      this.slicedMovies = this.movies;
    } else {

      this.slicedMovies = this.movies.slice(0, this.numberOfFilmTOShow);
    }*/

  }
}
