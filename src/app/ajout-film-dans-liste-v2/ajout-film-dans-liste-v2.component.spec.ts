import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFilmDansListeV2Component } from './ajout-film-dans-liste-v2.component';

describe('AjoutFilmDansListeV2Component', () => {
  let component: AjoutFilmDansListeV2Component;
  let fixture: ComponentFixture<AjoutFilmDansListeV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutFilmDansListeV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutFilmDansListeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
