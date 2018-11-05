import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TmdbService} from './tmdb.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { ProfilComponent } from './profil/profil.component';
import { FilmComponent } from './film/film.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { FilmListComponent } from './film-list/film-list.component';
import { ActeurComponent } from './acteur/acteur.component';
import { ActeurGridComponent } from './acteur-grid/acteur-grid.component';
import { ActeurInfoComponent } from './acteur-info/acteur-info.component';
import { MenuComponent } from './menu/menu.component';

import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {RouterModule, Routes} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {MatMenuModule} from '@angular/material/menu';
import { PlaylistComponent } from './playlist/playlist.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FilmInfoComponent } from './film-info/film-info.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FilmsPageComponent } from './films-page/films-page.component';

const appRoutes: Routes = [
  { path: 'acteur-info', component: ActeurInfoComponent },
  { path: 'acteurs', component: ActeurGridComponent },
  { path: '',  redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    FilmComponent,
    FilmListComponent,
    ActeurComponent,
    ActeurInfoComponent,
    ActeurGridComponent,
    MenuComponent,
    HomePageComponent,
    PlaylistComponent,
    FilmInfoComponent,
    FilmsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [TmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
