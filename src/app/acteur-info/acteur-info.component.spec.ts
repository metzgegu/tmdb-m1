import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeurInfoComponent } from './acteur-info.component';

describe('ActeurInfoComponent', () => {
  let component: ActeurInfoComponent;
  let fixture: ComponentFixture<ActeurInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActeurInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActeurInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
