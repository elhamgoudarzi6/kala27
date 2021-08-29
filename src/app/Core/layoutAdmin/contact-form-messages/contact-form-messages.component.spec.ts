import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormMessagesComponent } from './contact-form-messages.component';

describe('ContactFormMessagesComponent', () => {
  let component: ContactFormMessagesComponent;
  let fixture: ComponentFixture<ContactFormMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFormMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
