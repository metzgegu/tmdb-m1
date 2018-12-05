import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {TmdbService} from '../tmdb.service';
import {PersonResponse} from '../tmdb-data/Person';
import {Firebase2Service} from '../firebase2.service';

@Component({
  selector: 'app-acteur',
  templateUrl: './acteur.component.html',
  styleUrls: ['./acteur.component.css']
})
export class ActeurComponent implements OnInit {
  @Input() actor: PersonResponse ;
  @Output() clickSurActeur = new EventEmitter<PersonResponse>();
  public favori: boolean ;



  constructor(private fb: Firebase2Service) {

  }

  functionClickSurActeur() {
    this.clickSurActeur.emit(this.actor);
  }

  ngOnInit() {
    this.favori = false;
    const result = this.fb.isFavorite(this.actor.id);
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
      this.fb.addActorToFavourite(this.actor.id);
      console.log('add');
    } else {
      this.fb.deleteActorFromFavourite(this.actor.id);
      console.log('remove');
    }
  }
}
