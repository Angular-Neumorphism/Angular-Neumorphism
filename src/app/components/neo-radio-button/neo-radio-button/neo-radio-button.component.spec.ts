import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoRadioButtonComponent } from './neo-radio-button.component';

describe('NeoRadioButtonComponent', () => {
  let component: NeoRadioButtonComponent;
  let fixture: ComponentFixture<NeoRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoRadioButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
