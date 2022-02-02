import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPeginatedGridComponent } from './category-peginated-grid.component';

describe('CategoryPeginatedGridComponent', () => {
  let component: CategoryPeginatedGridComponent;
  let fixture: ComponentFixture<CategoryPeginatedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPeginatedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPeginatedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
