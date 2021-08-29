import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryEditDialogComponent } from './sub-category-edit-dialog.component';

describe('SubCategoryEditDialogComponent', () => {
  let component: SubCategoryEditDialogComponent;
  let fixture: ComponentFixture<SubCategoryEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
