import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoSnackBar } from './neo-snack-bar.component';

describe('NeoSnackBar', () => {
  let component: NeoSnackBar;
  let fixture: ComponentFixture<NeoSnackBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoSnackBar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoSnackBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
