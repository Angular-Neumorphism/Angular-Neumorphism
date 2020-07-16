import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionpageComponent } from './expansionpage.component';

describe('ExpansionpageComponent', () => {
  let component: ExpansionpageComponent;
  let fixture: ComponentFixture<ExpansionpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
