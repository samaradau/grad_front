import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyInfoComponent } from './assembly-info.component';

describe('AssemblyInfoComponent', () => {
  let component: AssemblyInfoComponent;
  let fixture: ComponentFixture<AssemblyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssemblyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
