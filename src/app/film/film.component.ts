import {Component, Input, OnInit} from '@angular/core';
import {MovieResult} from '../tmdb-data/searchMovie';
import {MovieResponse} from '../tmdb-data/Movie';
import {FirebaseService} from '../firebase.service';
import {TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit{

  @Input() movie: MovieResult;
  @Input() fs: FirebaseService;
  isLiked = false;

  constructor() {
  }

  ngOnInit() {
    console.log('Film ' + this.fs);
  }

  like() {
    this.isLiked = !this.isLiked;
  }

  addToPlaylist() {
    console.log('haha');
    this.fs.addFilmToPlaylist(this.movie, 'adqd');
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
}
