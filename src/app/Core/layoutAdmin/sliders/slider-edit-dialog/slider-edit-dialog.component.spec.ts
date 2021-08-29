import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderEditDialogComponent } from './slider-edit-dialog.component';

describe('SliderEditDialogComponent', () => {
  let component: SliderEditDialogComponent;
  let fixture: ComponentFixture<SliderEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
