import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FirebaseService} from '../firebase.service';
import {MovieResponse} from '../tmdb-data/Movie';
import {MoviesList} from '../playlist/MoviesList';
import {MatSnackBar} from '@angular/material';
import {Firebase2Service} from '../firebase2.service';
import {Router} from '@angular/router';
import DataSnapshot = firebase.database.DataSnapshot;
import {Log} from '@angular/core/testing/src/logger';

export interface DialogData {
  mail: any;
  playlist: MoviesList[];
}

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, private fb: Firebase2Service, public dialog: MatDialog, private router: Router) {
  }

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

  mail: string;

  ngOnInit() {
    if (!this.fb.isConnected()) {
      this.router.navigate(['/home']);
    }
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
    console.log('Create Playlist');
    this.fb.createPlaylist(this.title, this.desc).then(() => {
      this.openSnackBar('Playlist ajouté !', '');
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
      data: {playlist: _playlist, mail: this.mail}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.mail !== undefined) {
        this.fb.shareListTo(result.playlist.id, result.mail).then(() => this.openSnackBar('L\'uttilisateur ' + result.mail + ' a dorénavant accès à la liste!', ''));
      }
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

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
