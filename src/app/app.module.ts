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
import {MatSelectModule} from '@angular/material/select';

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
import {DialogComponent, PlaylistPageComponent} from './playlist-page/playlist-page.component';
import { AjoutFilmDansListeV2Component } from './ajout-film-dans-liste-v2/ajout-film-dans-liste-v2.component';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  { path: 'acteur-info', component: ActeurInfoComponent },
  { path: 'acteurs', component: ActeurGridComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'films', component: FilmsPageComponent },
  { path: 'actors', component: ActeurGridComponent },
  { path: 'playlist', component: PlaylistPageComponent },
  { path: 'account', component: ProfilComponent },
  { path: 'acteurs/:id', component: ActeurInfoComponent },
  { path: 'films/:id', component: FilmInfoComponent },
  { path: '',  redirectTo: '/home', pathMatch: 'full' },
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
    FilmsPageComponent,
    DialogComponent,
    PlaylistPageComponent,
    AjoutFilmDansListeV2Component
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
    MatSelectModule,
    MatSnackBarModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule,
    MatInputModule,

    MatMenuModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  entryComponents: [DialogComponent],
  providers: [TmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
