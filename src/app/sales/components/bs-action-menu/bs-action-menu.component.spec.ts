import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsActionMenuComponent } from './bs-action-menu.component';

describe('BsActionMenuComponent', () => {
  let component: BsActionMenuComponent;
  let fixture: ComponentFixture<BsActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsActionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
