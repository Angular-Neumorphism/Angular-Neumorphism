import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoCard } from './neo-card.component';

describe('NeoCardComponent', () => {
  let component: NeoCard;
  let fixture: ComponentFixture<NeoCard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoCard ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
