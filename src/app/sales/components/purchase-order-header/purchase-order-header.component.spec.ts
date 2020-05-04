import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderHeaderComponent } from './purchase-order-header.component';

describe('PurchaseOrderHeaderComponent', () => {
  let component: PurchaseOrderHeaderComponent;
  let fixture: ComponentFixture<PurchaseOrderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
