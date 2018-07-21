/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MicroBidComponent } from './micro-bid.component';

describe('MicroBidComponent', () => {
  let component: MicroBidComponent;
  let fixture: ComponentFixture<MicroBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
