import { Component, OnInit, Input } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {MoviesList} from './MoviesList';
import {MovieResponse} from '../tmdb-data/Movie';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() fs: FirebaseService;
  @Input() playlist: MoviesList;
  constructor() {
  }

  ngOnInit() {
    console.log(this.playlist);
  }

}
