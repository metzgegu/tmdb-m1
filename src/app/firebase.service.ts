import { Injectable } from '@angular/core';
import { MovieResponse } from './tmdb-data/Movie';
import { PersonResponse } from './tmdb-data/Person';
import { TVResponse } from './tmdb-data/TV';
import * as firebase from 'firebase';
import {User} from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {TmdbService} from './tmdb.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private user: User, private tmdb: TmdbService) {
  }

  public createPlaylist(listName: string, listDesc: string) {
    firebase.database().ref(`users/${this.user.uid}/playlists/${listName}`).push({
      description : listDesc
    });
  }

  // Peut être appellée avec ou sans paramètre
  // Sans paramètre = récupération de toutes les playlists, et il faut mettre undefined quand on l'appelle (voir l'appel à getMovie dans addFilmToPlaylist
  // Avec paramètre = récupération de la playlist qui porte le nom fourni en paramètre
  public getPlaylist(listName?: string) {
    switch (listName) {
      case undefined:
        firebase.database().ref(`users/${this.user.uid}/playlists`)
          .on('value', (data: DataSnapshot) => data.val() );
        break;
      default:
        firebase.database().ref(`users/${this.user.uid}/playlists`)
          .on('value', (data: DataSnapshot) => data.child(`/${listName}`).exists() ? data.val() : [] );
    }
  }

  public removePlaylist(listName: string) {
    firebase.database().ref(`users/${this.user.uid}/playlists/${listName}`).remove();
  }

  public addFilmToPlaylist(id: number, listName: string) {
    const filmInfos = this.tmdb.getMovie(id, undefined);
    firebase.database().ref(`users/${this.user.uid}/playlists/${listName}`).push({
      films : filmInfos
    });
  }

  public deleteFilmFromPlaylist(id: number, listName: string) {
    firebase.database().ref(`users/${this.user.uid}/playlists/${listName}/films/${id}`).remove();
  }

  public addActorToFavourite(id: number) {
    const actorInfos = this.tmdb.getPerson(id, undefined);
    firebase.database().ref(`users/${this.user.uid}`).push({
      favoriteActors : actorInfos
    });
  }

  public getFavouriteActors() {
    firebase.database().ref(`users/${this.user.uid}/favoriteActors`).on('value', (data: DataSnapshot) => data.val());
  }

  public isFavorite(id: number) {
   firebase.database().ref(`users/${this.user.uid}/favoriteActors/${id}`).on('value', (data: DataSnapshot) => data.val());

  }

  public deleteActorFromFavourite(id) {
    firebase.database().ref(`users/${this.user.uid}/favouriteActors/${id}`).remove();
  }

  public addFilmToFavourite(id: number) {
    const filmInfos = this.tmdb.getMovie(id, undefined);
    firebase.database().ref(`users/${this.user.uid}/playlists`).push({
      favouriteFilms : filmInfos
    });
  }

  public getFavouriteFilms() {
    firebase.database().ref(`users/${this.user.uid}/favoriteFilms`).on('value', (data: DataSnapshot) => data.val());
  }

  public deleteFilmFromFavourite(id) {
    firebase.database().ref(`users/${this.user.uid}/playlists/favouriteFilms/${id}`).remove();
  }
}
