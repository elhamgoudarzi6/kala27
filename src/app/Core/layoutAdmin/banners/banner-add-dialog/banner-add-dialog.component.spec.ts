import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAddDialogComponent } from './banner-add-dialog.component';

describe('BannerAddDialogComponent', () => {
  let component: BannerAddDialogComponent;
  let fixture: ComponentFixture<BannerAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
