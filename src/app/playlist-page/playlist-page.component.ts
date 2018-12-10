import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FirebaseService} from '../firebase.service';
import {MovieResponse} from '../tmdb-data/Movie';
import {MoviesList} from '../playlist/MoviesList';
import {MatSnackBar} from '@angular/material';
import {Firebase2Service} from '../firebase2.service';
import DataSnapshot = firebase.database.DataSnapshot;
import {Log} from '@angular/core/testing/src/logger';

export interface DialogData {
  playlist: MoviesList[];
}

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

  constructor(public snackBar: MatSnackBar, private fb: Firebase2Service, public dialog: MatDialog) {
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

  public delete(playlistId: string) {
    this.fb.removePlaylist(playlistId).then(() => {
      this.openSnackBar('Playlist supprimée!', '');
      this.updatePlaylist();
    });
  }

  roll() {
    this.slicedPlaylists = this.playlists.slice(this.cursor, this.cursor + this.numberOfFilmTOShow);
    if (this.cursor + this.numberOfFilmTOShow > this.playlists.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor += this.cursor + this.numberOfFilmTOShow;
    }
  }

  openDialog(_playlist): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { playlist: _playlist }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
})
export class DialogComponent {

  email;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.playlist);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    // envoyer laPlaylist a email
    this.dialogRef.close();
  }

}
