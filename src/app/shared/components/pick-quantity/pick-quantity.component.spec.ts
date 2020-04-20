import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickQuantityComponent } from './pick-quantity.component';

describe('PickQuantityComponent', () => {
  let component: PickQuantityComponent;
  let fixture: ComponentFixture<PickQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
