import {Component, Input, OnInit,} from '@angular/core';
import {MovieResult} from '../tmdb-data/searchMovie';
import {MovieResponse} from '../tmdb-data/Movie';
import {FirebaseService} from '../firebase.service';


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  @Input() fs: FirebaseService;
  @Input() movies: MovieResult[];

  constructor() {
    console.log(this.movies);
  }

  ngOnInit() {
    console.log('Film-list ' + this.fs);
  }

}
