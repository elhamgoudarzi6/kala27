import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsDialogComponent } from './blog-details-dialog.component';

describe('BlogDetailsDialogComponent', () => {
  let component: BlogDetailsDialogComponent;
  let fixture: ComponentFixture<BlogDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
