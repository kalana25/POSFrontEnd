import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderEditItemComponent } from './purchase-order-edit-item.component';

describe('PurchaseOrderEditItemComponent', () => {
  let component: PurchaseOrderEditItemComponent;
  let fixture: ComponentFixture<PurchaseOrderEditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderEditItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
