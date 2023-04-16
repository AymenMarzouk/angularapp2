import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttechniqueComponent } from './testtechnique.component';

describe('TesttechniqueComponent', () => {
  let component: TesttechniqueComponent;
  let fixture: ComponentFixture<TesttechniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesttechniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesttechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
