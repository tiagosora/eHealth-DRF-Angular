import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppointmentsPageComponent } from './my-appointments-page.component';

describe('MyAppointmentsPageComponent', () => {
  let component: MyAppointmentsPageComponent;
  let fixture: ComponentFixture<MyAppointmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAppointmentsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAppointmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
