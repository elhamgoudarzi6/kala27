import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFactorsComponent } from './order-factors.component';

describe('OrderFactorsComponent', () => {
  let component: OrderFactorsComponent;
  let fixture: ComponentFixture<OrderFactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFactorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
