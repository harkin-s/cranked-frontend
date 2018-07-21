import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsAdminComponent } from './listings-admin.component';

describe('ListingsAdminComponent', () => {
  let component: ListingsAdminComponent;
  let fixture: ComponentFixture<ListingsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
