import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountAddDialogComponent } from './discount-add-dialog.component';

describe('DiscountAddDialogComponent', () => {
  let component: DiscountAddDialogComponent;
  let fixture: ComponentFixture<DiscountAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
