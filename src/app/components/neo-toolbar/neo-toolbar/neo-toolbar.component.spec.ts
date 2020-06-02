import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoToolbarComponent } from './neo-toolbar.component';

describe('NeoToolbarComponent', () => {
  let component: NeoToolbarComponent;
  let fixture: ComponentFixture<NeoToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
