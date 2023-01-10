import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Department } from 'src/app/models/Department';
import { Appointment } from 'src/app/models/Appointment';
import { DepartmentService } from 'src/app/services/department/department.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Emitter } from 'src/app/emitters/emitters';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-new-appointment-page',
  templateUrl: './new-appointment-page.component.html',
  styleUrls: ['./new-appointment-page.component.css'],
})
export class NewAppointmentPageComponent implements OnInit {
  minDate = new Date();
  departments: Department[];
  is_authenticated: boolean;
  userId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private appointmentService : AppointmentService,
    private router: Router,
    private authService: AuthenticationService,
  ) {
    this.departments = [];
    this.is_authenticated = false;

  }

  profileForm = this.formBuilder.group({
    department: [''],
    date: [''],
    message: [''],
  });

  saveForm() {
    console.log(this.profileForm.value.department)
    if (this.profileForm.value.department != null) {    
          let departmentName: any = this.profileForm.value.department;
          let date: any = new DatePipe('en').transform(this.profileForm.value.date, 'yyyy-MM-dd');
          let message: any = this.profileForm.value.message;
          console.log(date)
          let data: Appointment;
  
          data = new Appointment(0, this.userId, departmentName, date, message);
          this.appointmentService.createAppointment(data).subscribe(r => r);
          this.router.navigate(["myappointments"]).then(() => window.location.reload());
        }
    }

  ngOnInit(): void {
    this.departmentService.getAllDepartments().subscribe(
      d => {
        this.departments = d;
      }
    );
    this.authService.isAuthenticated()
    Emitter.isAuthenticated.subscribe(
      (auth: boolean) => {
        this.is_authenticated = auth;
      }
    );
    Emitter.userId.subscribe(
      (u: number) => {
        console.log(u);
        this.userId = u;
      }
    );
  }
}

export class NewAppointmentPageModule {}
