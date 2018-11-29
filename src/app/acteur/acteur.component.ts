import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {TmdbService} from '../tmdb.service';
import {PersonResponse} from '../tmdb-data/Person';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-acteur',
  templateUrl: './acteur.component.html',
  styleUrls: ['./acteur.component.css']
})
export class ActeurComponent implements OnInit {
  @Input() actor: PersonResponse ;
  public favori: boolean ;

  constructor(private fs: FirebaseService) {

  }

  functionClickSurActeur() {
    // this.clickSurActeur.emit(this.actor);
  }

  ngOnInit() {
    this.favori = false;
    if (this.fs.isConnected()) {
      const result = this.fs.isFavorite(this.actor.id);
      if (result !== undefined) {
        this.favori = true;
      } else {
        this.favori = false;
      }
    }
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  switchFavori() {
    this.favori = !this.favori;
    if (this.favori) {
      this.fs.addActorToFavourite(this.actor.id);
      console.log('add');
    } else {
      this.fs.deleteActorFromFavourite(this.actor.id);
      console.log('remove');
    }
  }
}
