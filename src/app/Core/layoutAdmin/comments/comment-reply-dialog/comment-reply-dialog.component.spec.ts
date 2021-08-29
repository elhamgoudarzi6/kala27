import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReplyDialogComponent } from './comment-reply-dialog.component';

describe('CommentReplyDialogComponent', () => {
  let component: CommentReplyDialogComponent;
  let fixture: ComponentFixture<CommentReplyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentReplyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentReplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
