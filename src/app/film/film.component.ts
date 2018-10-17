import { Component, Input,  } from '@angular/core';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent {

  constructor() { }

  @Input() movie: Object;

  getTitle(): string{
    return this.movie.original_title;
  }

  getImgSource(): string{
    return this.getPath(this.movie.poster_path);
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
