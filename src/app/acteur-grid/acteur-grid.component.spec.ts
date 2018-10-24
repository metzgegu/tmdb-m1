import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeurGridComponent } from './acteur-grid.component';

describe('ActeurGridComponent', () => {
  let component: ActeurGridComponent;
  let fixture: ComponentFixture<ActeurGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActeurGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActeurGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
