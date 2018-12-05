import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {TmdbService} from './tmdb.service';
import {MoviesList} from './playlist/MoviesList';
import { Observable, of } from 'rxjs';
import {MovieResponse} from './tmdb-data/Movie';

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
    const id = firebase.database().ref(`lists/`).push({
      author: this.user.uid,
      title: title,
      desc: desc
    });
    return firebase.database().ref(`users/${this.user.uid}/playlists`).set({
      id : id
    });
  }

  //NOT TESTED
  public addFilmToFavourite(id: number) {
    const filmInfos = this.tmdb.getMovie(id, undefined);
    firebase.database().ref(`users/${this.user.uid}/playlists`).push({
      favouriteFilms : filmInfos
    });
  }

  //NOT TESTED
  public getFavouriteFilms() {
    firebase.database().ref(`users/${this.user.uid}/favoriteFilms`).on('value', (data: DataSnapshot) => data.val());
  }

  //NOT TESTED
  public deleteFilmFromFavourite(id) {
    firebase.database().ref(`users/${this.user.uid}/playlists/favouriteFilms/${id}`).remove();
  }

  //NOT TESTED
  public addFilmToPlaylist(movie: MovieResponse, listName: string) {
    firebase.database().ref(`users/${this.user.uid}/playlists/${listName}/films`).push(
      movie
    );
  }

  //NOT TESTED
  public addActorToFavourite(id: number) {
    const actorInfos = this.tmdb.getPerson(id, undefined);
    firebase.database().ref(`users/${this.user.uid}`).push({
      favoriteActors : actorInfos
    });
  }

  //NOT TESTED
  public deleteActorFromFavourite(id) {
    firebase.database().ref(`users/${this.user.uid}/favouriteActors/${id}`).remove();
  }

  //NOT TESTED
  public isFavorite(id: number) {
    firebase.database().ref(`users/${this.user.uid}/favoriteActors/${id}`).on('value', (data: DataSnapshot) => data.val());
  }
}
