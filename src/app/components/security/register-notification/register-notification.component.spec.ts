import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNotificationComponent } from './register-notification.component';

describe('RegisterNotificationComponent', () => {
  let component: RegisterNotificationComponent;
  let fixture: ComponentFixture<RegisterNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
