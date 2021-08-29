import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerEditDialogComponent } from './banner-edit-dialog.component';

describe('BannerEditDialogComponent', () => {
  let component: BannerEditDialogComponent;
  let fixture: ComponentFixture<BannerEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
