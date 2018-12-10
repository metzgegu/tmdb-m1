import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieResult} from '../tmdb-data/searchMovie';
import {MovieResponse} from '../tmdb-data/Movie';
import {FirebaseService} from '../firebase.service';
import {TmdbService} from '../tmdb.service';
import {MoviesList} from '../playlist/MoviesList';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Firebase2Service} from '../firebase2.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit {

  @Input() movie: MovieResponse;
  @Output() clickFilm = new EventEmitter<MovieResponse>();
  isLiked = false;
  allPlaylist;
  private rawPlaylists: JSON;
  public playlists: MoviesList[] = [];

  constructor(public snackBar: MatSnackBar, private fb: Firebase2Service) {
  }

  ngOnInit() {
    this.fb.getObjectPlaylist().then(val => {
      this.playlists = val;
    });
  }

  like() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.fb.addFilmToFavourite(this.movie.id);
    } else {
      this.fb.deleteFilmFromFavourite(this.movie.id);
    }
  }

  addToPlaylist(playListId) {
    console.log(playListId);
    let alreadyIn = false;
    const thePlaylist = this.playlists.find((p) => p.id === playListId);
    if (thePlaylist.movies !== undefined && thePlaylist.movies !== []) {
      console.log(thePlaylist.movies);
      const existingMovie = thePlaylist.movies.find((m) => m.id === this.movie.id);
      if (existingMovie !== undefined) { alreadyIn = true; }
    }
    if (alreadyIn === false) {
      this.fb.addFilmToPlaylist(this.movie, playListId).then(() => {
        this.openSnackBar('Film ajouté !','');
        this.fb.getObjectPlaylist().then(val => {
          this.playlists = val;
        });
      });
    } else {
      this.openSnackBar('Oups ce film est déjà présent dans la playlist!','');
    }
  }

  getTitle(): string {
    return this.movie.title;
  }

  getImgSource(): string {
    return this.getPath(this.movie.poster_path);
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  clickOnFilm() {
    console.log('guillaume');
    this.clickFilm.emit(this.movie);
  }
}
