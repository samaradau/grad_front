import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordEnterEmailComponent } from './restore-password-enter-email.component';

describe('RestorePasswordEnterEmailComponent', () => {
  let component: RestorePasswordEnterEmailComponent;
  let fixture: ComponentFixture<RestorePasswordEnterEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordEnterEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordEnterEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
