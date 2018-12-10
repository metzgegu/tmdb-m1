import { Component, OnInit, Input } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {MovieResponse} from '../tmdb-data/Movie';
import {MoviesList} from '../playlist/MoviesList';
import {MatSnackBar} from '@angular/material';
import {TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit {

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

  constructor(public snackBar: MatSnackBar, private fs: FirebaseService) {
  }

  ngOnInit() {
    // console.log('Playlist ' + this.fs);
    this.fs.getAllPlaylist().then(val => {
      this.rawPlaylists = val.val();
      if (this.rawPlaylists !== null) {
        const lists = Object.keys(this.rawPlaylists);
        for (const l of lists) {
          const playlist: MoviesList = {
            name: l,
            description: this.rawPlaylists[l]['description'],
            movies: []
          };
          console.log(playlist);
          console.log(this.rawPlaylists[l].films);
          for (const f in this.rawPlaylists[l].films) {
            const m: MovieResponse = <MovieResponse>this.rawPlaylists[l].films[f];
            playlist.movies.push(m);
          }
          /*for (const m of moviesLists) {
            playlist.movies.push(<MovieResponse> m);
          }*/
          this.playlists.push(playlist);
        }
        this.slicedPlaylists = this.playlists.slice(0, this.numberOfFilmTOShow);
        this.cursor = 0;
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public createPlaylist() {
    const play: MoviesList = { name : this.title};
    this.playlists.push(play);
    this.fs.createPlaylist( this.title,  this.desc);
    this.desc = ' ';
    this.title = ' ';
    this.openSnackBar('Playlist ajoutée!', '');
  }

  public delete(playListName: string) {
    this.fs.removePlaylist(playListName);
    this.openSnackBar('Playlist supprimée!', '');
    // TODO - re charger le front pour que la playlist supprimée disparaisse
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
    console.log('exit');
  }
}
