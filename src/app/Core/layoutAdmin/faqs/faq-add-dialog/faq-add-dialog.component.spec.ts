import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAddDialogComponent } from './faq-add-dialog.component';

describe('FaqAddDialogComponent', () => {
  let component: FaqAddDialogComponent;
  let fixture: ComponentFixture<FaqAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
