import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoToolbar } from './neo-toolbar.component';

describe('NeoToolbar', () => {
  let component: NeoToolbar;
  let fixture: ComponentFixture<NeoToolbar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoToolbar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
