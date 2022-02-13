import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaginatedGridComponent } from './product-paginated-grid.component';

describe('ProductPaginatedGridComponent', () => {
  let component: ProductPaginatedGridComponent;
  let fixture: ComponentFixture<ProductPaginatedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPaginatedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPaginatedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
