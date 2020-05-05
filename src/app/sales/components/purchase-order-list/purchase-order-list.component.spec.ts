import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderListComponent } from './purchase-order-list.component';

describe('PurchaseOrderComponent', () => {
  let component: PurchaseOrderListComponent;
  let fixture: ComponentFixture<PurchaseOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
