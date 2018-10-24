import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonResponse} from '../tmdb-data/Person';

@Component({
  selector: 'app-acteur',
  templateUrl: './acteur.component.html',
  styleUrls: ['./acteur.component.css']
})
export class ActeurComponent implements OnInit {
  @Input() actor: PersonResponse ;

  @Output() clickSurActeur = new EventEmitter<PersonResponse>();
  public favori: boolean ;

  constructor() {

  }

  functionClickSurActeur() {
    this.clickSurActeur.emit(this.actor);
  }

  ngOnInit() {
    this.favori = false;
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  switchFavori() {
    // TODO informer le model
    this.favori = !this.favori;
  }
}
