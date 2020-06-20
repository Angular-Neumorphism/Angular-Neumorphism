import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoCheckbox } from './neo-checkbox.component';

describe('NeoCheckboxComponent', () => {
  let component: NeoCheckbox;
  let fixture: ComponentFixture<NeoCheckbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoCheckbox ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
