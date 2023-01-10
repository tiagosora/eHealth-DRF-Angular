import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder} from '@angular/forms';
import { Department } from 'src/app/models/Department';
import { Appointment } from 'src/app/models/Appointment';
import { DepartmentService } from 'src/app/services/department/department.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Emitter } from 'src/app/emitters/emitters';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-appointment-page',
  templateUrl: './update-appointment-page.component.html',
  styleUrls: ['./update-appointment-page.component.css']
})
export class UpdateAppointmentPageComponent implements OnInit {
  minDate = new Date();
  departments: Department[];
  userId: any;
  department!: string;
  date!: string | Date;
  message!: string;
  url!: any;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,    
    private departmentService: DepartmentService,
    private appointmentService : AppointmentService,
    private authService: AuthenticationService,) { this.departments = [];}


  profileForm = this.formBuilder.group({
    department: [''],
    date: [''],
    message: [''],
  });

  saveForm() {
    console.log(this.profileForm.value.department)
    if (this.profileForm.value.department != null){    
      let departmentName: any = this.profileForm.value.department;
      let date: any = new DatePipe('en').transform(this.profileForm.value.date, 'yyyy-MM-dd');
      let message: any = this.profileForm.value.message;

      let data: Appointment;

      data = new Appointment(this.url, this.userId, departmentName, date, message)
      console.log(data)
      this.appointmentService.updateAppointment(data).subscribe(r => r);
      this.router.navigate(["myappointments"]).then(() => window.location.reload());
    }
  }

  ngOnInit(): void {
    this.authService.isAuthenticated();
    this.url = this.router.url.split("/").at(-1);
    if (this.url != undefined){ 
      let id : number = parseInt(this.url);
      this.appointmentService.getAppointment(id).subscribe(app => {
        console.log(app)
        if (app != undefined){
          this.department = app.department;
          this.date = app.date
          this.message = app.message
          console.log(app.department);
          console.log(app.date);
          console.log(app.message);
        }
      })
      }
    this.departmentService.getAllDepartments().subscribe(
      d => {
        this.departments = d;
      }
    );
    Emitter.userId.subscribe(
      u => {
        this.userId = u;
      }
    );
    }
  }

