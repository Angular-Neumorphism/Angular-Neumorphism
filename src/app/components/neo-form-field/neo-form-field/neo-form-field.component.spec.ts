import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoFormField } from './neo-form-field.component';

describe('NeoFormFieldComponent', () => {
  let component: NeoFormField;
  let fixture: ComponentFixture<NeoFormField>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoFormField ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoFormField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
