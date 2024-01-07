import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubCategoryAddDialogComponent } from './sub-sub-category-add-dialog.component';

describe('SubSubCategoryAddDialogComponent', () => {
  let component: SubSubCategoryAddDialogComponent;
  let fixture: ComponentFixture<SubSubCategoryAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSubCategoryAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubCategoryAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
