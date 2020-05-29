import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoCardComponent } from './neo-card.component';

describe('NeoCardComponent', () => {
  let component: NeoCardComponent;
  let fixture: ComponentFixture<NeoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
