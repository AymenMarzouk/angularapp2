import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquetestComponent } from './historiquetest.component';

describe('HistoriquetestComponent', () => {
  let component: HistoriquetestComponent;
  let fixture: ComponentFixture<HistoriquetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriquetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
