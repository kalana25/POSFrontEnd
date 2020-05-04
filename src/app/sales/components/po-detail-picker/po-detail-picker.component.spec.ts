import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoDetailPickerComponent } from './po-detail-picker.component';

describe('PoDetailPickerComponent', () => {
  let component: PoDetailPickerComponent;
  let fixture: ComponentFixture<PoDetailPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoDetailPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoDetailPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
