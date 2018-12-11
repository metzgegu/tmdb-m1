import { Component, OnInit, Input } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {MoviesList} from './MoviesList';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist: MoviesList;
  constructor(private fs: FirebaseService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // console.log(this.playlist);
  }

  sharePlaylist() {
  }
}
