import {Component, Input, OnInit} from '@angular/core';
import {PersonResponse} from '../tmdb-data/Person';
import {TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-acteur-grid',
  templateUrl: './acteur-grid.component.html',
  styleUrls: ['./acteur-grid.component.css']
})
export class ActeurGridComponent implements OnInit {

  acteurSelectionner;
  private clickActeur: boolean;
  private col;
  private row;
  @Input() acteurs;
  private filterActeur;


  constructor() {
  }

  ngOnInit() {
    this.col = 1;
    this.row = 1;
    this.filterActeur = this.acteurs;
    this.clickActeur = false;
  }

  getLigne() {
    return this.row;
  }

  getCol() {
    if (this.col === 6) {
      this.col = 1;
      this.row++;
      return this.col;
    } else {
      this.col++;
      return this.col - 1;
    }
  }

  onSearchChange(searchValue: string ) {
    this.filterActeur = [];
    this.acteurs.forEach((a) => {if (a.name.toUpperCase().includes(searchValue.toUpperCase())) {
      this.filterActeur.push(a);
    }});
  }

  clickSurActeurCard(e) {
    console.log(e);
    this.acteurSelectionner = e;
    this.clickActeur = true;
  }

  exitInfoActeur(e) {
    this.clickActeur = false;
  }
}
