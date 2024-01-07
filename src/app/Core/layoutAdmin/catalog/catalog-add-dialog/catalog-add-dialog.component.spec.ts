import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogAddDialogComponent } from './catalog-add-dialog.component';

describe('CatalogAddDialogComponent', () => {
  let component: CatalogAddDialogComponent;
  let fixture: ComponentFixture<CatalogAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
