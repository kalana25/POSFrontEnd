import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderEditComponent } from './purchase-order-edit.component';

describe('PurchaseOrderEditComponent', () => {
  let component: PurchaseOrderEditComponent;
  let fixture: ComponentFixture<PurchaseOrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
