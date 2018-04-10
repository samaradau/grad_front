import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyInfoViewComponent } from './assembly-info-view.component';

describe('AssemblyInfoViewComponent', () => {
  let component: AssemblyInfoViewComponent;
  let fixture: ComponentFixture<AssemblyInfoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssemblyInfoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
