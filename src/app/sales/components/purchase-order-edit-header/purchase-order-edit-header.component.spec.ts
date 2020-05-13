import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderEditHeaderComponent } from './purchase-order-edit-header.component';

describe('PurchaseOrderEditHeaderComponent', () => {
  let component: PurchaseOrderEditHeaderComponent;
  let fixture: ComponentFixture<PurchaseOrderEditHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderEditHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderEditHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
