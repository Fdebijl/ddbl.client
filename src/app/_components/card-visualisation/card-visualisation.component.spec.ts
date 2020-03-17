import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVisualisationComponent } from './card-visualisation.component';

describe('CardVisualisationComponent', () => {
  let component: CardVisualisationComponent;
  let fixture: ComponentFixture<CardVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
