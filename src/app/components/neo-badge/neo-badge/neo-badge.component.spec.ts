import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoBadgeComponent } from './neo-badge.component';

describe('NeoBadgeComponent', () => {
  let component: NeoBadgeComponent;
  let fixture: ComponentFixture<NeoBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
