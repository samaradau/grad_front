import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordSendSuccessComponent } from './restore-password-send-success.component';

describe('RestorePasswordSendSuccessComponent', () => {
  let component: RestorePasswordSendSuccessComponent;
  let fixture: ComponentFixture<RestorePasswordSendSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordSendSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordSendSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
