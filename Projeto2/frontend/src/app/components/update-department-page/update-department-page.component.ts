import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import {DoctorService} from 'src/app/services/doctor/doctor.service'
import { Doctor } from 'src/app/models/Doctor';

@Component({
  selector: 'app-update-department-page',
  templateUrl: './update-department-page.component.html',
  styleUrls: ['./update-department-page.component.css']
})
export class UpdateDepartmentPageComponent implements OnInit {
  doctors! : Doctor[]

  constructor(
    private doctorService : DoctorService,
    private authService: AuthenticationService,
  ) { }

  

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe(
      docs => {
        console.log(docs)
        this.doctors = docs
      }
    )
  }
}
