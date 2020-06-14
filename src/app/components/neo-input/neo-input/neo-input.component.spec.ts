import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoInput } from './neo-input.component';

describe('NeoInputComponent', () => {
  let component: NeoInput;
  let fixture: ComponentFixture<NeoInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoInput ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
