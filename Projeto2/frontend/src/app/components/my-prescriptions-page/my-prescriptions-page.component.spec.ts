import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPrescriptionsPageComponent } from './my-prescriptions-page.component';

describe('MyPrescriptionsPageComponent', () => {
  let component: MyPrescriptionsPageComponent;
  let fixture: ComponentFixture<MyPrescriptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPrescriptionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPrescriptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
