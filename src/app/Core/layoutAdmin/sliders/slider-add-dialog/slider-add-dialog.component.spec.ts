import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderAddDialogComponent } from './slider-add-dialog.component';

describe('SliderAddDialogComponent', () => {
  let component: SliderAddDialogComponent;
  let fixture: ComponentFixture<SliderAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
