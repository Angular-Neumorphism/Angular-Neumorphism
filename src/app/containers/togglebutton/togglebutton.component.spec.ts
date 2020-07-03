import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglebuttonComponent } from './togglebutton.component';

describe('TogglebuttonComponent', () => {
  let component: TogglebuttonComponent;
  let fixture: ComponentFixture<TogglebuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TogglebuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
