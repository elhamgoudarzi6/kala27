import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountEditDialogComponent } from './discount-edit-dialog.component';

describe('DiscountEditDialogComponent', () => {
  let component: DiscountEditDialogComponent;
  let fixture: ComponentFixture<DiscountEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
