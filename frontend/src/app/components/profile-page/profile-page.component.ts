import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitter } from 'src/app/emitters/emitters';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user! : User;
  userType! : string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private patientService : PatientService,
    private doctorService: DoctorService,
  ) {

  }

  profilePatientForm = this.formBuilder.group({
    first_name: [''],
    last_name: [''],
    email: [''],
    password: [''],
    repassword: [''],
  });

  profileDoctorForm = this.formBuilder.group({
    password: [''],
    repassword: [''],
  });

  doctorFormSave() {
    if (this.profileDoctorForm.value.password != '' && this.profileDoctorForm.value.password != null &&
      this.profileDoctorForm.value.password == this.profileDoctorForm.value.repassword){
        let password = this.profileDoctorForm.value.password;
        let data = {"password":password}
        this.doctorService.updateDoctor(this.user.id,data).subscribe(r => r)
        window.location.reload()
    }
  }

  patientFormSave() {
    if (this.profilePatientForm.value.password != '' && this.profileDoctorForm.value.password != null &&
      this.profilePatientForm.value.password == this.profilePatientForm.value.repassword){
        let first_name = this.profilePatientForm.value.first_name
        let last_name = this.profilePatientForm.value.last_name
        let email = this.profilePatientForm.value.email
        let password = this.profilePatientForm.value.password;

        console.log(first_name)
        let data = {"first_name":first_name,"last_name":last_name,"email":email,"password":password}
        console.log(data)
        this.patientService.updatePatient(this.user.id,data).subscribe(r=>r)
        window.location.reload()
    }
  }

  ngOnInit(): void {
    this.authService.isAuthenticated()
    Emitter.userId.subscribe(
      (userId : number) => {
        if (userId != undefined) {
          this.authService.getUserById(userId).subscribe(
            (user : User) => {
              this.user = user;
            }
          )
        }
      }
    )
    Emitter.usertype.subscribe(
      (userType : string) => {
        if (userType != undefined) {
          this.userType = userType;
        }
      }
    )
  }

}
