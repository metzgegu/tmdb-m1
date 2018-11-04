import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonResponse} from '../../../../../../WebstormProjects/tmdb-m1/src/app/tmdb-data/Person';
import {FirebaseService} from '../firebase.service';
import {TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-acteur',
  templateUrl: './acteur.component.html',
  styleUrls: ['./acteur.component.css']
})
export class ActeurComponent implements OnInit {
  @Input() actor: PersonResponse ;
  @Output() clickSurActeur = new EventEmitter<PersonResponse>();
  @Input() fs: FirebaseService;
  public favori: boolean ;



  constructor() {

  }

  functionClickSurActeur() {
    this.clickSurActeur.emit(this.actor);
  }

  ngOnInit() {
    this.favori = false;
    const result = this.fs.isFavorite(this.actor.id));
    if (result !== undefined) {
      this.favori = true;
    } else {
      this.favori = false;
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
