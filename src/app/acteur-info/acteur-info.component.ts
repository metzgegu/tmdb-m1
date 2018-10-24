import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonResponse} from '../tmdb-data/Person';
import { PlatformLocation } from '@angular/common'

@Component({
  selector: 'app-acteur-info',
  templateUrl: './acteur-info.component.html',
  styleUrls: ['./acteur-info.component.css']
})
export class ActeurInfoComponent implements OnInit {
  @Input() actor: PersonResponse ;
  @Output() exitEmitter = new EventEmitter<any>();

  constructor(location: PlatformLocation) {
    // window.onhashchange = this.exit;
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
