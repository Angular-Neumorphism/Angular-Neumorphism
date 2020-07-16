import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoDialogComponent } from './neo-dialog.component';

describe('NeoDialogComponent', () => {
  let component: NeoDialogComponent;
  let fixture: ComponentFixture<NeoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
