import { Component, OnInit, Input } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {MoviesList} from './MoviesList';
import {MovieResponse} from '../tmdb-data/Movie';
import {TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist: MoviesList;
  @Input() title: String;
  constructor(private fs: FirebaseService) {
  }

  ngOnInit() {
    console.log(this.playlist);
  }

}
