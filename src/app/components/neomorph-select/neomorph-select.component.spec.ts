import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeomorphSelectComponent } from './neomorph-select.component';

describe('NeomorphSelectComponent', () => {
  let component: NeomorphSelectComponent;
  let fixture: ComponentFixture<NeomorphSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeomorphSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeomorphSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
