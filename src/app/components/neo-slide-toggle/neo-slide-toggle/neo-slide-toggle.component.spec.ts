import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoSlideToggleComponent } from './neo-slide-toggle.component';

describe('NeoSlideToggleComponent', () => {
  let component: NeoSlideToggleComponent;
  let fixture: ComponentFixture<NeoSlideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoSlideToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
