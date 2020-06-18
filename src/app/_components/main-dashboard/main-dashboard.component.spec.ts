import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashboardComponent } from './main-dashboard.component';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainDashboardComponent,
        CardComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
