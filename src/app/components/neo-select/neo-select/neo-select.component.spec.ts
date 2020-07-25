import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoSelectComponent } from './neo-select.component';

describe('NeoSelectComponent', () => {
  let component: NeoSelectComponent;
  let fixture: ComponentFixture<NeoSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
