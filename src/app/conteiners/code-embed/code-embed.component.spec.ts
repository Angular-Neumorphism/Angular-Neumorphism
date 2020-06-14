import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEmbedComponent } from './code-embed.component';

describe('CodeEmbedComponent', () => {
  let component: CodeEmbedComponent;
  let fixture: ComponentFixture<CodeEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeEmbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
