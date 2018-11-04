import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeurComponent } from './acteur.component';

describe('ActeurComponent', () => {
  let component: ActeurComponent;
  let fixture: ComponentFixture<ActeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
