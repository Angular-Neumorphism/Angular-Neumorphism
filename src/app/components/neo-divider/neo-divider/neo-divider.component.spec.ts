import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoDividerComponent } from './neo-divider.component';

describe('NeoDividerComponent', () => {
  let component: NeoDividerComponent;
  let fixture: ComponentFixture<NeoDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoDividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
