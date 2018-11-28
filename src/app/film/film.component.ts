import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MovieResult} from '../tmdb-data/searchMovie';
import {MovieResponse} from '../tmdb-data/Movie';
import {FirebaseService} from '../firebase.service';
import {TmdbService} from '../tmdb.service';
import {MoviesList} from '../playlist/MoviesList';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMenuTrigger} from '@angular/material';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit {

  @Input() movie: MovieResponse;
  @Input() fs: FirebaseService;
  @Output() clickFilm = new EventEmitter<MovieResponse>();
  @ViewChild(MatMenuTrigger) private menuTrigger: MatMenuTrigger;
  isLiked = false;
  private rawPlaylists: JSON;
  public playlists: MoviesList[] = [];
  public searchQuery: string;

  constructor(public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    // console.log('Film ' + this.fs);
    this.fs.getAllPlaylist().then(val => {
      this.rawPlaylists = val.val();
      if (val.val() === undefined) {
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

          this.playlists.push(playlist);
        }
      }
    });
    console.log(this.playlists);
  }

  like() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.fs.addFilmToFavourite(this.movie.id);
    } else {
      this.fs.deleteFilmFromFavourite(this.movie.id);
    }
  }

  addToPlaylist(playListName) {
    console.log(playListName);
    let alreadyIn;
    const myCurrentPlaylist = this.playlists.filter(p => p.name === this.searchQuery);
    myCurrentPlaylist.forEach(p => p.movies.forEach(m => m.id === this.movie.id ? alreadyIn = true : alreadyIn = false));
    if (!alreadyIn) {
      this.fs.addFilmToPlaylist(this.movie, playListName);
      this.openSnackBar('Film ajouté !', '');
    } else {
      this.openSnackBar('Film déjà présent dans la playlist !', '');
    }
  }

  closeMenu() {
    this.menuTrigger.closeMenu();
  }

  onSubmit() {
    console.log(this.searchQuery);
    this.fs.createPlaylist(this.searchQuery, '');
    this.addToPlaylist(this.searchQuery);
    // this.closeMenu();
  }

  getTitle(): string {
    return this.movie.title;
  }

  getImgSource(): string {
    return this.getPath(this.movie.poster_path);
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  clickOnFilm() {
    console.log('guillaume');
    this.clickFilm.emit(this.movie);
  }
}
