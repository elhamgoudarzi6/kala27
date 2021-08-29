import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddDialogComponent } from './admin-add-dialog.component';

describe('AdminAddDialogComponent', () => {
  let component: AdminAddDialogComponent;
  let fixture: ComponentFixture<AdminAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
