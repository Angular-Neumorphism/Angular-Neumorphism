import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RippleContainerComponent } from './ripple-container.component';

describe('RippleContainerComponent', () => {
  let component: RippleContainerComponent;
  let fixture: ComponentFixture<RippleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RippleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RippleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
