import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {TmdbService} from './tmdb.service';
import {MoviesList} from './playlist/MoviesList';
import {MovieResponse} from './tmdb-data/Movie';
@Injectable({
  providedIn: 'root'
})
export class Firebase2Service {
  private user: User;
  private tmdb: TmdbService;

  constructor() { }

  getPlaylistId(uid): Promise<DataSnapshot> {
    return firebase.database().ref(`users/${uid}`).child(`/playlists`).once('value');
  }

  getPlaylist(uid): Promise<any[]> {
    return firebase.database().ref(`users/${uid}`).child(`/playlists`).once('value').then(function(snapshot) {
      const movies = [];
      snapshot.forEach(function(childSnapshot: DataSnapshot) {
        const playlistId = childSnapshot.val();
        const promise =  firebase.database().ref(`lists/`).child(playlistId).once('value').then(function(snap) {
          const dummy: any = snap.val();
          if (dummy !== null) {dummy.id = playlistId;}
          return dummy;
        });
        movies.push(promise);
      });
      return Promise.all(movies);
    });
  }

  getObjectPlaylist(): Promise<MoviesList[]> {
    if ( this.isConnected()) {
      return this.getPlaylist(this.user.uid).then(val => {
        return val.filter(list => list !== null ).map(list => {
          const MovieList: MoviesList = {
            name: list.title,
            description: list.desc,
            movies: (list.films !== undefined) ? Object.values(list.films) : [],
            id: list.id
          };
          return MovieList;
        });
      });
    } else {
      return new Promise((resolve) => { resolve(null); });
    }
  }

  setTmbd(tmdb: TmdbService) {
    this.tmdb = tmdb;
  }

  setUser(user: User) {
    this.user = user;
  }

  createPlaylist(title: string, desc: string) {
    const id = firebase.database().ref(`lists/`).push({
      author: this.user.uid,
      title: title,
      desc: desc
    }).key;
    return this.addUserToPlaylist(this.user.uid, id).then(() => id);
  }

  addUserToPlaylist(idUser: string, idPlaylist: string) {
    return firebase.database().ref(`users/${idUser}/playlists`).push(idPlaylist);
  }

  // NOT TESTED
  public addFilmToFavourite(id: number) {
    const filmInfos = this.tmdb.getMovie(id, undefined);
    firebase.database().ref(`users/${this.user.uid}/playlists`).push({
      favouriteFilms : filmInfos
    });
  }

  // NOT TESTED
  public getFavouriteFilms() {
    firebase.database().ref(`users/${this.user.uid}/favoriteFilms`).on('value', (data: DataSnapshot) => data.val());
  }

  // NOT TESTED
  public deleteFilmFromFavourite(id) {
    firebase.database().ref(`users/${this.user.uid}/playlists/favouriteFilms/${id}`).remove();
  }

  // NOT TESTED
  public addFilmToPlaylist(movie: MovieResponse, listId: string) {
    return firebase.database().ref(`lists/${listId}/films`).push(
      movie
    );
  }

  // NOT TESTED
  public addActorToFavourite(id: number) {
    const actorInfos = this.tmdb.getPerson(id, undefined);
    firebase.database().ref(`users/${this.user.uid}`).push({
      favoriteActors : actorInfos
    });
  }

  // NOT TESTED
  public deleteActorFromFavourite(id) {
    firebase.database().ref(`users/${this.user.uid}/favouriteActors/${id}`).remove();
  }

  // NOT TESTED
  public isFavorite(id: number) {
    firebase.database().ref(`users/${this.user.uid}/favoriteActors/${id}`).on('value', (data: DataSnapshot) => data.val());
  }

  isConnected() {
    return this.user !== undefined;
  }

  removePlaylist(playListId) {
    if (this.isConnected()) {
      return firebase.database().ref(`users/${this.user.uid}/playlists/`).once('value', val => {
        val.forEach(function (childSnapshot: DataSnapshot) {
            const playlist = childSnapshot.val();
            if (playlist === playListId) {
              childSnapshot.ref.remove();
            }
          }
        );
      });
    }
  }

  setMail(email: string) {
    firebase.database().ref(`users/${this.user.uid}/`).update({mail: `${email}`});
  }

  shareListTo(playListId, userMail) {
    if (this.isConnected()) {
      return firebase.database().ref(`users/`).once('value', val => {
        let key;
        val.forEach((childSnapshot: DataSnapshot) => {
            const user = childSnapshot.val();
            if (user.mail === userMail) {
              key = childSnapshot.key;
            }
          });
          return (key === undefined ) ? null : this.addUserToPlaylist(key, playListId);
      });
    }
  }

}
