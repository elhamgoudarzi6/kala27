import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangePasswordDialogComponent } from './admin-change-password-dialog.component';

describe('AdminChangePasswordDialogComponent', () => {
  let component: AdminChangePasswordDialogComponent;
  let fixture: ComponentFixture<AdminChangePasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChangePasswordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
