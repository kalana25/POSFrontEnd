import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountAddComponent } from './discount-add.component';

describe('DiscountAddComponent', () => {
  let component: DiscountAddComponent;
  let fixture: ComponentFixture<DiscountAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
