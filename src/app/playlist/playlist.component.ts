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
  private rawPlaylists: JSON;
  public playlists: MoviesList[] = [];
  constructor() {
  }

  ngOnInit() {
    console.log('Playlist ' + this.fs);
    this.fs.getAllPlaylist().then(val => {
      this.rawPlaylists = val.val();
      const lists = Object.keys( this.rawPlaylists);
      for (const l of lists) {
        const playlist: MoviesList = {
          name : l,
          description : this.rawPlaylists[l]['description'],
          movies: []
        };
        console.log(playlist);
          console.log(this.rawPlaylists[l].films);
        for (const f in this.rawPlaylists[l].films) {
          const m: MovieResponse = <MovieResponse> this.rawPlaylists[l].films[f];
          playlist.movies.push(m);
        }
        /*for (const m of moviesLists) {
          playlist.movies.push(<MovieResponse> m);
        }*/
        this.playlists.push(playlist);
      }
    });
  }

  public createPlaylist(listName: string, listDesc: string) {
    this.fs.createPlaylist(listName, listDesc);
  }
}
