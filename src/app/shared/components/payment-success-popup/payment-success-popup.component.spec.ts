import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccessPopupComponent } from './payment-success-popup.component';

describe('PaymentSuccessPopupComponent', () => {
  let component: PaymentSuccessPopupComponent;
  let fixture: ComponentFixture<PaymentSuccessPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSuccessPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
