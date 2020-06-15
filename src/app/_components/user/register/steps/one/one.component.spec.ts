import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneComponent } from './one.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('OneComponent', () => {
  let component: OneComponent;
  let fixture: ComponentFixture<OneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OneComponent
      ],
      providers: [
        FormBuilder
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
