import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordNotificationComponent } from './restore-password-notification.component';

describe('RestorePasswordNotificationComponent', () => {
  let component: RestorePasswordNotificationComponent;
  let fixture: ComponentFixture<RestorePasswordNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
