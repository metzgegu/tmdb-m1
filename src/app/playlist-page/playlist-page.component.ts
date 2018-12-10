import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {MovieResponse} from '../tmdb-data/Movie';
import {MoviesList} from '../playlist/MoviesList';
import {MatSnackBar} from '@angular/material';
import {Firebase2Service} from '../firebase2.service';
import DataSnapshot = firebase.database.DataSnapshot;
import {Log} from '@angular/core/testing/src/logger';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit {

  private rawPlaylists: JSON;
  public playlists: MoviesList[] = [];
  slicedPlaylists: MoviesList[] = [];
  desc = '';
  title = '';
  canBeMore;
  cursor;
  numberOfFilmTOShow = 5;
  playlistClicked;
  playlistIsClicked = false;

  constructor(public snackBar: MatSnackBar, private fb: Firebase2Service) {
  }

  ngOnInit() {
    this.updatePlaylist();
  }

  updatePlaylist() {
    this.fb.getObjectPlaylist().then(val => {
      this.playlists = val;
      if (this.playlists != null) {
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
    console.log("Create Playlist");
    this.fb.createPlaylist( this.title,  this.desc).then(() => {
        this.openSnackBar('Playlist ajouté !','');
        this.updatePlaylist();
     });
    this.desc = ' ';
    this.title = ' ';
  }

  public delete(playListName: string) {
    this.fb.removePlaylist(playListName);
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
