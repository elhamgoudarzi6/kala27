import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorOrdersComponent } from './factor-orders.component';

describe('FactorOrdersComponent', () => {
  let component: FactorOrdersComponent;
  let fixture: ComponentFixture<FactorOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
