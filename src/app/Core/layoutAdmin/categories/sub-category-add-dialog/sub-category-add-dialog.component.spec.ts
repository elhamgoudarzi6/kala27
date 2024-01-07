import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryAddDialogComponent } from './sub-category-add-dialog.component';

describe('SubCategoryAddDialogComponent', () => {
  let component: SubCategoryAddDialogComponent;
  let fixture: ComponentFixture<SubCategoryAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
