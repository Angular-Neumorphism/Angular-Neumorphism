import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TubsComponent } from './tubs.component';

describe('TubsComponent', () => {
  let component: TubsComponent;
  let fixture: ComponentFixture<TubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
