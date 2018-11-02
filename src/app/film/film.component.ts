import { Component, Input,  } from '@angular/core';
import {MovieResult} from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent {

  constructor() { }

  @Input() movie: MovieResult;
  isLiked = false;

  like() {
    this.isLiked = !this.isLiked;
  }

  getTitle(): string {
    return this.movie.original_title;
  }

  getImgSource(): string {
    return this.getPath(this.movie.poster_path);
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
