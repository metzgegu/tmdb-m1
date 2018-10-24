import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TmdbService} from './tmdb.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { ActeurComponent } from './acteur/acteur.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActeurGridComponent } from './acteur-grid/acteur-grid.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import { ActeurInfoComponent } from './acteur-info/acteur-info.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: 'acteur-info', component: ActeurInfoComponent },
  { path: 'acteurs', component: ActeurGridComponent },
  { path: '',  redirectTo: '/acteurs', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ActeurComponent,
    ActeurGridComponent,
    ActeurInfoComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FlexLayoutModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [TmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
