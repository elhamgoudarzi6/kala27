import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubCategoryEditDialogComponent } from './sub-sub-category-edit-dialog.component';

describe('SubSubCategoryEditDialogComponent', () => {
  let component: SubSubCategoryEditDialogComponent;
  let fixture: ComponentFixture<SubSubCategoryEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSubCategoryEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubCategoryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
