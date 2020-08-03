import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoSliderContainerComponent } from './neo-slider-container.component';

describe('NeoSliderContainerComponent', () => {
  let component: NeoSliderContainerComponent;
  let fixture: ComponentFixture<NeoSliderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoSliderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoSliderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
