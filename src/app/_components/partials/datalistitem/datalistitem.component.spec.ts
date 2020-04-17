import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalistitemComponent } from './datalistitem.component';

describe('DatalistitemComponent', () => {
  let component: DatalistitemComponent;
  let fixture: ComponentFixture<DatalistitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatalistitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
