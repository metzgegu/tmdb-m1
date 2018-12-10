import { Component, OnInit, Input } from '@angular/core';
import {TmdbService} from '../tmdb.service';
import {MovieResponse} from '../tmdb-data/Movie';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  trendingMovies: MovieResponse[] = [];
  numberOftrendingMovieToShow = 5;

  constructor(private tmdb: TmdbService, private fs: FirebaseService) {

    setTimeout( () =>
        tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .getTrendingMovie()
          .then( (m) => {
            this.trendingMovies = m.results;
          } )
          .catch( err => console.error('Error getting movie:', err) ),
      1000 );

  }

  ngOnInit() {
    console.log('HomePage ' + this.fs);
  }

}
