import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDescriptionComponent } from './api-description.component';

describe('ApiDescriptionComponent', () => {
  let component: ApiDescriptionComponent;
  let fixture: ComponentFixture<ApiDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
