import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesSenderComponent } from './invites-sender.component';

describe('InvitesSenderComponent', () => {
  let component: InvitesSenderComponent;
  let fixture: ComponentFixture<InvitesSenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitesSenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
