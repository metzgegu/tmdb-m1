import { Component, OnInit, Input } from '@angular/core';
import {User} from 'firebase';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() fs: FirebaseService;
  constructor() {

  }

  ngOnInit() {
    console.log(this.fs);
  }

}
