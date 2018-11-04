import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonResponse} from '../tmdb-data/Person';
import { PlatformLocation } from '@angular/common'
import {TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-acteur-info',
  templateUrl: './acteur-info.component.html',
  styleUrls: ['./acteur-info.component.css']
})
export class ActeurInfoComponent implements OnInit {
  @Input() actor;
  @Output() exitEmitter = new EventEmitter<any>();
  actor1: PersonResponse;

  constructor(location: PlatformLocation, private tmdb: TmdbService) {
    // window.onhashchange = this.exit;

    setTimeout( () =>
        tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .getPerson(this.actor.id)
          .then( (a) => this.actor1 = a)
          .catch( err => console.error('Error getting movie:', err) ),
      1000 );
    location.onPopState(() => {
      this.exitEmitter.emit();
    });
  }

  ngOnInit() {

  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  exit() {
    console.log('antoine');
    // window.location.reload();
    this.exitEmitter.emit();
  }


}
