import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderDetailComponent } from './purchase-order-detail.component';

describe('PurchaseOrderDetailComponent', () => {
  let component: PurchaseOrderDetailComponent;
  let fixture: ComponentFixture<PurchaseOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
