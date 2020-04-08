import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisComponent } from './vis.component';
import { Metadata } from 'src/app/_domain';

describe('VisComponent', () => {
  let component: VisComponent;
  let fixture: ComponentFixture<VisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('visData', JSON.stringify(Metadata.mock()));

    fixture = TestBed.createComponent(VisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
