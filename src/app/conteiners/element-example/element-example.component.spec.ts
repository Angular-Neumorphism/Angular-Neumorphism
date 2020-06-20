import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementExampleComponent } from './element-example.component';

describe('ElementExampleComponent', () => {
  let component: ElementExampleComponent;
  let fixture: ComponentFixture<ElementExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
