import { Component, OnInit, Input } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {MovieResponse} from '../tmdb-data/Movie';
import {MoviesList} from '../playlist/MoviesList';
import {MatSnackBar} from '@angular/material';
import {Firebase2Service} from '../firebase2.service';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit {

  @Input() fs: FirebaseService;
  private rawPlaylists: JSON;
  public playlists: MoviesList[] = [];
  slicedPlaylists: MoviesList[] = [];
  desc = null;
  title = null;
  canBeMore;
  cursor;
  numberOfFilmTOShow = 5;
  playlistClicked;
  playlistIsClicked = false;

  constructor(public snackBar: MatSnackBar, private fb: Firebase2Service) {
  }

  ngOnInit() {
    console.log('Playlist ' + this.fs);
    this.fb.getPlaylist().then(val => {
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
      this.slicedPlaylists = this.playlists.slice(0, this.numberOfFilmTOShow);
      this.cursor = 0;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public createPlaylist() {
    console.log("Create Playlist");
    const play: MoviesList = { name : this.title};
    this.playlists.push(play);
    this.fb.createPlaylist( this.title,  this.desc).then(() => this.openSnackBar('Playlist ajouté !',''));
    this.desc = ' ';
    this.title = ' ';
  }

  roll() {
    this.slicedPlaylists = this.playlists.slice(this.cursor, this.cursor + this.numberOfFilmTOShow);
    if (this.cursor + this.numberOfFilmTOShow > this.playlists.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor += this.cursor + this.numberOfFilmTOShow;
    }
  }

  clickOnPlaylist(e) {
    this.playlistClicked = e;
    this.playlistIsClicked = true;
  }

  exitInfo() {
    this.playlistIsClicked = false;
    console.log("exit");
  }
}
