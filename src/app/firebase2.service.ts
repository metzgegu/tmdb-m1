import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {TmdbService} from './tmdb.service';
import {MoviesList} from './playlist/MoviesList';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Firebase2Service {
  private user: User;
  private tmdb: TmdbService;

  constructor() { }

  getPlaylist(): Promise<DataSnapshot> {
    return firebase.database().ref(`users/${this.user.uid}/playlists`).once('value');
  }

  setTmbd(tmdb: TmdbService) {
    this.tmdb = tmdb;
  }

  setUser(user: User) {
    this.user = user;
  }

  createPlaylist(title: string, desc: string): Promise<void> {
    return firebase.database().ref(`users/${this.user.uid}/playlists/${title}/description`).set(desc);
  }
}
