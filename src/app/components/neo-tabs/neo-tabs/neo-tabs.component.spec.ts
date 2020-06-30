import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoTab } from './neo-tabs.component';

describe('NeoTabsComponent', () => {
  let component: NeoTab;
  let fixture: ComponentFixture<NeoTab>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoTab ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
