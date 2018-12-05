import {Component, Input, OnInit} from '@angular/core';
import {PersonResponse} from '../tmdb-data/Person';
import {TmdbService} from '../tmdb.service';
import {FirebaseService} from '../firebase.service';
import {SearchPeopleResponse} from '../tmdb-data/SearchPeople';

@Component({
  selector: 'app-acteur-grid',
  templateUrl: './acteur-grid.component.html',
  styleUrls: ['./acteur-grid.component.css']
})
export class ActeurGridComponent implements OnInit {

  acteurSelectionner;
  public clickActeur: boolean;
  private col;
  private row;
  searchValue;
  private acteurs;
  private filterActeur;


  constructor(private tmdb: TmdbService, private fs: FirebaseService) {
    setTimeout( () =>
        this.tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .getTrendingPerson()
          .then( (a: SearchPeopleResponse) => this.filterActeur = a.results)
          .catch( err => console.error('Error getting actor:', err) ),
      1000 );
  }

  ngOnInit() {
    console.log('Acteur' + this.fs);
    this.col = 1;
    this.row = 1;
    this.searchValue = '';
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
    const querySearch = {
      query: this.searchValue
    };
    this.filterActeur = [];
    setTimeout( () =>
        this.tmdb.init('80d6fe65cffe579d433c3da0f5d11307') // Clef de TMDB
          .searchPerson( querySearch )
          .then( (p: SearchPeopleResponse) => p.results.forEach((personResponse) => this.tmdb.getPerson(personResponse.id).then((person) => this.filterActeur.push(person))))
          .catch( err => console.error('Error getting movie:', err) ),
      1000 );
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
