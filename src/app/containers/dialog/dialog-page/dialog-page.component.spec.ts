import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPageComponent } from './dialog-page.component';

describe('DialogPageComponent', () => {
  let component: DialogPageComponent;
  let fixture: ComponentFixture<DialogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
