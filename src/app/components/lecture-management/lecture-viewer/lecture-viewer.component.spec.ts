import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureViewerComponent } from './lecture-viewer.component';

describe('LectureViewerComponent', () => {
  let component: LectureViewerComponent;
  let fixture: ComponentFixture<LectureViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
