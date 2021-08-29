import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketReplyDialogComponent } from './ticket-reply-dialog.component';

describe('TicketReplyDialogComponent', () => {
  let component: TicketReplyDialogComponent;
  let fixture: ComponentFixture<TicketReplyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketReplyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketReplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
