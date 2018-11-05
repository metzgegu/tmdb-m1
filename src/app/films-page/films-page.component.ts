import {Component, Input, OnInit} from '@angular/core';
import {TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-films-page',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.css']
})
export class FilmsPageComponent implements OnInit {

  @Input() fs;
  films = [];

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  constructor(private tmdb: TmdbService) {
    
  }

  ngOnInit() {
  }

}
