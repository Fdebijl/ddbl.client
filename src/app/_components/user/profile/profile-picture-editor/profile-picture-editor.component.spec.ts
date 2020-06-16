import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePictureEditorComponent } from './profile-picture-editor.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProfilePictureCropperComponent', () => {
  let component: ProfilePictureEditorComponent;
  let fixture: ComponentFixture<ProfilePictureEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePictureEditorComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePictureEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
