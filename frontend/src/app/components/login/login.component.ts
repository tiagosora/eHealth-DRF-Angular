import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { PatientService } from 'src/app/services/patient/patient.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Loginform: FormGroup;
  public jwt: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private patienteService: PatientService,
    private router: Router,
  ) { 
    this.Loginform = formBuilder.group(
      {
        email: [''],
        password: [''],
      }
    )
  }

  setCookie(name: string, val: number): void {
    const date = new Date();
    const value = val;
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";

  }

  submitForm(): void {
    this.authService.login(this.Loginform.value).subscribe(
      d => {
        this.setCookie("jwt", d.jwt);
        this.router.navigate([""]).then(()=>window.location.reload());
      }
    );
  }

  ngOnInit(): void {
  }

}
