import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderListDetailComponent } from './purchase-order-list-detail.component';

describe('PurchaseOrderListDetailComponent', () => {
  let component: PurchaseOrderListDetailComponent;
  let fixture: ComponentFixture<PurchaseOrderListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
