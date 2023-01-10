import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Emitter } from 'src/app/emitters/emitters';
import { Prescription } from 'src/app/models/Prescription';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { PrescriptionService } from 'src/app/services/prescription/prescription.service';

@Component({
  selector: 'app-my-prescriptions-page',
  templateUrl: './my-prescriptions-page.component.html',
  styleUrls: ['./my-prescriptions-page.component.css']
})
export class MyPrescriptionsPageComponent implements OnInit {

  prescriptions! : Prescription[];
  userType: any;
  userId: any;
  isLoading = true;  // Add this line


  constructor(
    private prescriptionService : PrescriptionService,
    private authService: AuthenticationService,
  ) {
  }

  reload123(): void {
    location.reload()
    }

  ngOnInit(): void {
    this.authService.isAuthenticated();
    Emitter.usertype.subscribe(
      userType => {
        if (userType != undefined && userType != "not_authenticated") {
          this.userType = userType;
          console.log(userType)
          Emitter.userId.subscribe(
            userId => {
              if (userId != undefined) {
                console.log(userId)
                this.userId = userId;
                if (userType == 'patient') {
                  this.prescriptionService.getPatientPrescriptions(userId).subscribe(
                    (pres) => {
                      this.prescriptions = pres;
                      console.log(this.prescriptions)
                      // if (!localStorage.getItem('foo')) { 
                      //   localStorage.setItem('foo', 'no reload') 
                      //   window.location.reload()
                      // } else {
                      //   console.log("fim")
                      //   localStorage.removeItem('foo') 
                      // }
                    }
                  )
                }
                else if (userType == 'doctor') {
                  this.prescriptionService.getDoctorPrescriptions(userId).subscribe(
                    (pres) => {
                      console.log(pres)
                      this.prescriptions = pres;
                      console.log(this.prescriptions)
                      // if (!localStorage.getItem('foo')) { 
                      //   localStorage.setItem('foo', 'no reload') 
                      //   location.reload() 
                      // } else {
                      //   console.log("fim2")
                      //   localStorage.removeItem('foo') 
                      // }
                    }
                  )
                }
              }
            }
          )
        }
      }
    );
  }
}
