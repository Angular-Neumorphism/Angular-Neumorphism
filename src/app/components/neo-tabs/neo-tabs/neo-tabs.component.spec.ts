import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoTabsComponent } from './neo-tabs.component';

describe('NeoTabsComponent', () => {
  let component: NeoTabsComponent;
  let fixture: ComponentFixture<NeoTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
