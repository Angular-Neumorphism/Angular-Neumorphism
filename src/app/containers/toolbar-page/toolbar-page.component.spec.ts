import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarPageComponent } from './toolbar-page.component';

describe('ToolbarPageComponent', () => {
  let component: ToolbarPageComponent;
  let fixture: ComponentFixture<ToolbarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
