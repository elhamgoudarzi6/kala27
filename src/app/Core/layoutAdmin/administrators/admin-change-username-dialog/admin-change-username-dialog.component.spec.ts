import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeUsernameDialogComponent } from './admin-change-username-dialog.component';

describe('AdminChangeUsernameDialogComponent', () => {
  let component: AdminChangeUsernameDialogComponent;
  let fixture: ComponentFixture<AdminChangeUsernameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChangeUsernameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeUsernameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
