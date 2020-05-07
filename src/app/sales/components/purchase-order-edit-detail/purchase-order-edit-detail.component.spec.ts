import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderEditDetailComponent } from './purchase-order-edit-detail.component';

describe('PurchaseOrderEditDetailComponent', () => {
  let component: PurchaseOrderEditDetailComponent;
  let fixture: ComponentFixture<PurchaseOrderEditDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderEditDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderEditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
