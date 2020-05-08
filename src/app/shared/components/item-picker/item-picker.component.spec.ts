import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPickerComponent } from './item-picker.component';

describe('ItemPickerComponent', () => {
  let component: ItemPickerComponent;
  let fixture: ComponentFixture<ItemPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
