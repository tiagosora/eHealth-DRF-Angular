import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppointmentPageComponent } from './update-appointment-page.component';

describe('UpdateAppointmentPageComponent', () => {
  let component: UpdateAppointmentPageComponent;
  let fixture: ComponentFixture<UpdateAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppointmentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
