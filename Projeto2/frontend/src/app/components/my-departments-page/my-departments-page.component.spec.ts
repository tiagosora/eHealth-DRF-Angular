import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDepartmentsPageComponent } from './my-departments-page.component';

describe('MyDepartmentsPageComponent', () => {
  let component: MyDepartmentsPageComponent;
  let fixture: ComponentFixture<MyDepartmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDepartmentsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDepartmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
