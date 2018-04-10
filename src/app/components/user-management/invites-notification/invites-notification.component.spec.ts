import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesNotificationComponent } from './invites-notification.component';

describe('InvitesNotificationComponent', () => {
  let component: InvitesNotificationComponent;
  let fixture: ComponentFixture<InvitesNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitesNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
