import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartmentPageComponent } from './update-department-page.component';

describe('UpdateDepartmentPageComponent', () => {
  let component: UpdateDepartmentPageComponent;
  let fixture: ComponentFixture<UpdateDepartmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDepartmentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDepartmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
