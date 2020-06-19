import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { VisComponent } from './vis.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('VisComponent', () => {
  let component: VisComponent;
  let fixture: ComponentFixture<VisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VisComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
