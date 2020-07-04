import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnItemComponent } from './grn-item.component';

describe('GrnItemComponent', () => {
  let component: GrnItemComponent;
  let fixture: ComponentFixture<GrnItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
