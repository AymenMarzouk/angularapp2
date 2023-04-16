import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriereComponent } from './carriere.component';

describe('CarriereComponent', () => {
  let component: CarriereComponent;
  let fixture: ComponentFixture<CarriereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarriereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
