import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrescriptionPageComponent } from './create-prescription-page.component';

describe('CreatePrescriptionPageComponent', () => {
  let component: CreatePrescriptionPageComponent;
  let fixture: ComponentFixture<CreatePrescriptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrescriptionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePrescriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
