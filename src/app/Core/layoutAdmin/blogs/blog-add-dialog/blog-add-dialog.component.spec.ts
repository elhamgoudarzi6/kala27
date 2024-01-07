import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAddDialogComponent } from './blog-add-dialog.component';

describe('BlogAddDialogComponent', () => {
  let component: BlogAddDialogComponent;
  let fixture: ComponentFixture<BlogAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
