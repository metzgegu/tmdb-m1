import {Component, Input, OnInit} from '@angular/core';
import {MovieResponse} from '../tmdb-data/Movie';
import {FirebaseService} from '../firebase.service';
import {MoviesList} from '../playlist/MoviesList';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit {

  @Input() movie: MovieResponse;
  isLiked = false;
  private rawPlaylists: JSON;
  public playlists: MoviesList[] = [];
  public searchQuery: string;

  constructor(public snackBar: MatSnackBar, private fs: FirebaseService) {
  }

  ngOnInit() {
    // console.log('Film ' + this.fs);
    this.fs.getAllPlaylist().then(val => {
      this.rawPlaylists = val.val();
      if (this.rawPlaylists !== null) {
        const lists = Object.keys( this.rawPlaylists);
        for (const l of lists) {
          const playlist: MoviesList = {
            name : l,
            description : this.rawPlaylists[l]['description'],
            movies: []
          };
          // console.log(playlist);
          // console.log(this.rawPlaylists[l].films);
          for (const f in this.rawPlaylists[l].films) {
            const m: MovieResponse = <MovieResponse> this.rawPlaylists[l].films[f];
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
    let alreadyIn;
    const myCurrentPlaylist = this.playlists.find(p => p.name === playListName);
    myCurrentPlaylist.movies.forEach(m => m.id === this.movie.id ? alreadyIn = true : alreadyIn = false);
    if (!alreadyIn) {
      this.fs.addFilmToPlaylist(this.movie, playListName);
      this.openSnackBar('Film ajouté !', '');
    } else {
      this.openSnackBar('Film déjà présent dans la liste !', '');
    }
  }

  addToNewPlaylist() {
    console.log(this.rawPlaylists)
    if (this.searchQuery !== undefined) {
      this.fs.createPlaylist(this.searchQuery, '');
      const newPlaylist: MoviesList = {
        name : this.searchQuery,
        description : '',
        movies: []
      };
      this.playlists.push(newPlaylist);
      this.addToPlaylist(this.searchQuery);
    }
  }

  /* closeMenu() {
    this.menuTrigger.closeMenu();
  }

  onSubmit() {
    console.log(this.searchQuery);
    this.fs.createPlaylist(this.searchQuery, '');
    this.addToPlaylist(this.searchQuery);
    // this.closeMenu();
  } */

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
    // this.clickFilm.emit(this.movie);
  }
}
