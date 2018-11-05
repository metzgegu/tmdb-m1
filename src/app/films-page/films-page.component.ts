import {Component, Input, OnInit} from '@angular/core';
import {TmdbService} from '../tmdb.service';
import {MovieResponse} from '../tmdb-data/Movie';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-films-page',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.css']
})
export class FilmsPageComponent implements OnInit {

  @Input() fs;
  films = [];
  searchValue;

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  constructor(private tmdb: TmdbService) {
    setTimeout( () =>
        tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .getTrendingMovie()
          .then( (m) => {
            this.films = m.results;
          } )
          .catch( err => console.error('Error getting movie:', err) ),
      1000 );
    this.searchValue = '';
  }

  onSearchChange() {
    const querySearch = {
      query: this.searchValue
    };
    this.films = [];
    setTimeout( () =>
        this.tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .searchMovie(querySearch)
          .then( (m: SearchMovieResponse) => {
            m.results.forEach((filmResult) => this.tmdb.getMovie(filmResult.id).then((filmResponse) => this.films.push(filmResponse)));
          } )
          .catch( err => console.error('Error getting movie:', err) ),
      1000 );
  }

  ngOnInit() {
  }

}
