import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseUnitAddComponent } from './base-unit-add.component';

describe('BaseUnitAddComponent', () => {
  let component: BaseUnitAddComponent;
  let fixture: ComponentFixture<BaseUnitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseUnitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseUnitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
