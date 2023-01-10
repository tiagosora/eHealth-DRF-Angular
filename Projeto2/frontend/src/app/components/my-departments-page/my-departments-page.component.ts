import { Component, OnInit } from '@angular/core';
import { Emitter } from 'src/app/emitters/emitters';
import { Appointment } from 'src/app/models/Appointment';
import { Department } from 'src/app/models/Department';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-my-departments-page',
  templateUrl: './my-departments-page.component.html',
  styleUrls: ['./my-departments-page.component.css']
})
export class MyDepartmentsPageComponent implements OnInit {

  appointments: Appointment[];
  departments: Department[];
  userId: any;
  userType: any;
  departmentName: string;

  constructor(
    private appointmentService : AppointmentService,
    private departmentService: DepartmentService,
    private AuthService: AuthenticationService,
  ) {
    this.departmentName = "";
    this.appointments = [];
    this.departments = []
  }

  deleteAppointment(appointmentId: any){
    this.appointmentService.deleteAppointment(appointmentId).subscribe()
    window.location.reload()
  }

  selectChange(data : any) {
    this.departmentName = data.value;
    this.appointments = [];
    this.appointmentService.getAllAppointments().subscribe(
      (appointments : Appointment[]) => {
        for (let a of appointments){
          if (this.userType == "doctor" && a.department == this.departmentName){
            this.appointments.push(a)
          }
        }
      }
    )
  }

  ngOnInit(): void {
    this.AuthService.isAuthenticated();
    Emitter.userId.subscribe(
      u => {
        this.userId = u;
    }); 
    Emitter.usertype.subscribe(
      t => {
        this.userType = t;
    });
    this.departmentService.getAllDepartments().subscribe(
      (departments: Department[]) => {
        for (let d of departments){
          for (let doctor of d.doctors){
            if(this.userId == doctor.user){
              this.departments.push(d)
            }
          }
        }
        console.log(this.departments)
      }
    )
    console.log(this.departments)
    this.appointmentService.getAllAppointments().subscribe(
      (appointments : Appointment[]) => {
        for (let a of appointments){
          if (this.userType == "doctor" && a.department == this.departmentName){
            this.appointments.push(a)
          }
        }
      }
    )
  }
}