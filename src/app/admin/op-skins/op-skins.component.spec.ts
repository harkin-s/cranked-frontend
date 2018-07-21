import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpSkinsComponent } from './op-skins.component';

describe('OpSkinsComponent', () => {
  let component: OpSkinsComponent;
  let fixture: ComponentFixture<OpSkinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpSkinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpSkinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
