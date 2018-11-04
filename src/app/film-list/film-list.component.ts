import { Component, Input,  } from '@angular/core';
import {MovieResult} from '../tmdb-data/searchMovie';
import {MovieResponse} from '../tmdb-data/Movie';


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent {

  constructor() {
    console.log(this.movies);
  }

  @Input() movies: MovieResult[];

}
