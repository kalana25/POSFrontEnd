import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcSetupBoardComponent } from './pc-setup-board.component';

describe('PcSetupBoardComponent', () => {
  let component: PcSetupBoardComponent;
  let fixture: ComponentFixture<PcSetupBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcSetupBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcSetupBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
