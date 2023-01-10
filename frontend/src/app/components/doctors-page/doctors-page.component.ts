import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/Department';
import { Doctor } from 'src/app/models/Doctor';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.css']
})
export class DoctorsPageComponent implements OnInit {

  doctors!: User[];
  departments!: Department[];
  selectedDepartment: Department | undefined;

  selectChange(data : any) {
    if (data.value != undefined){
      this.departmentService.getDepartment(data.value).subscribe(
        (department : Department) => {
          if (department != undefined) {
            this.doctors = []
            department.doctors.forEach(
              (d : any) => {
                this.authService.getUserById(d.user).subscribe(
                  (user: User) => {
                    if (user != undefined) {
                      this.doctors.push(user)
                    }
                  }
                )
              }
            )
          }
        }
      )
      
    } else {
      this.doctorService.getAllDoctors().subscribe(
        (doctors : Doctor[]) => {
          if (doctors != undefined) {
            this.doctors = []
            doctors.forEach(
              (d : any) => {
                this.authService.getUserById(d.user).subscribe(
                  (user: User) => {
                    if (user != undefined) {
                      this.doctors.push(user)
                    }
                  }
                )
              }
            )
          }
        }
      )
    }
    
  }

  constructor(
    private doctorService: DoctorService,
    private departmentService: DepartmentService,
    private authService: AuthenticationService,
  ) { 
    this.selectedDepartment = undefined;
  }

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe(
      (doctors : Doctor[]) => {
        if (doctors != undefined) {
          this.doctors = []
          doctors.forEach(
            (d : any) => {
              
              this.authService.getUserById(d.user).subscribe(
                (user: User) => {
                  if (user != undefined) {
                    console.log(user)
                    this.doctors.push(user)
                  }
                }
              )
            }
          )
        }
      }
    )
    this.departmentService.getAllDepartments().subscribe(
      (departments : Department[]) => {
        this.departments = departments;
      }
    )
    
    console.log(this.doctors)
  }
}