import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCostComponent } from './send-cost.component';

describe('SendCostComponent', () => {
  let component: SendCostComponent;
  let fixture: ComponentFixture<SendCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
