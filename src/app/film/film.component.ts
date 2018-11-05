import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieResult} from '../tmdb-data/searchMovie';
import {MovieResponse} from '../tmdb-data/Movie';
import {FirebaseService} from '../firebase.service';
import {TmdbService} from '../tmdb.service';
import {MoviesList} from '../playlist/MoviesList';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit {

  @Input() movie: MovieResponse;
  @Input() fs: FirebaseService;
  @Output() clickFilm = new EventEmitter<MovieResponse>();
  isLiked = false;
  allPlaylist;
  private rawPlaylists: JSON;
  public playlists: MoviesList[] = [];

  constructor(public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    // console.log('Film ' + this.fs);
    this.fs.getAllPlaylist().then(val => {
      this.rawPlaylists = val.val();
      const lists = Object.keys( this.rawPlaylists);
      for (const l of lists) {
        const playlist: MoviesList = {
          name : l,
          description : this.rawPlaylists[l]['description'],
          movies: []
        };
        console.log(playlist);
        console.log(this.rawPlaylists[l].films);
        for (const f in this.rawPlaylists[l].films) {
          const m: MovieResponse = <MovieResponse> this.rawPlaylists[l].films[f];
          playlist.movies.push(m);
        }

        this.playlists.push(playlist);
      }
    });
     console.log(this.playlists);
  }

  like() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.fs.addFilmToFavourite(this.movie.id);
    } else {
      this.fs.deleteFilmFromFavourite(this.movie.id);
    }
  }

  addToPlaylist(playListName) {
    console.log(playListName);
    let alreadyIn = false;
    this.playlists.forEach((p) => p.movies.forEach((m) => {if (m.id === this.movie.id) { alreadyIn = true; }}));
    if (!alreadyIn) {
      this.fs.addFilmToPlaylist(this.movie, playListName);
    }
    this.openSnackBar('Film ajouté !','');
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
