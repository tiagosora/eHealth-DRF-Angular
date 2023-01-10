import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Department } from 'src/app/models/Department';
import { Emitter } from 'src/app/emitters/emitters';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Prescription } from 'src/app/models/Prescription';
import { PrescriptionService } from 'src/app/services/prescription/prescription.service';

@Component({
  selector: 'app-create-prescription-page',
  templateUrl: './create-prescription-page.component.html',
  styleUrls: ['./create-prescription-page.component.css']
})
export class CreatePrescriptionPageComponent implements OnInit {

  departments: Department[];
  is_authenticated: boolean;
  userId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private prescriptionService : PrescriptionService,
    private router: Router,
    private authService: AuthenticationService,
  ) {
    this.departments = [];
    this.is_authenticated = false;
  }

  profileForm = this.formBuilder.group({
    patientId: [''],
    message: [''],
  });

  saveForm() {
    if (this.profileForm.value.patientId != null) {    
        let patientId: any = this.profileForm.value.patientId;
        let message: any = this.profileForm.value.message;
        let data: Prescription;

        data = new Prescription(0,patientId, this.userId, "", message);
        this.prescriptionService.createPrescription(data).subscribe(r => r);
        this.router.navigate(["myprescriptions"]).then(() => window.location.reload());
      }
    }

  ngOnInit(): void {
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
