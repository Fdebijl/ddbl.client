import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisComponentComponent } from './vis-component.component';

describe('VisComponentComponent', () => {
  let component: VisComponentComponent;
  let fixture: ComponentFixture<VisComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
