import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/Patient';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { 
    this.signupForm = formBuilder.group(
      {
        name: [''],
        email: [''],
        password: [''],
        repassword: [''],
      }
    )
  }

  submitForm(): void {
    if (
      this.signupForm.value.name == "" ||
      this.signupForm.value.email == "" ||
      this.signupForm.value.password == "" ||
      this.signupForm.value.repassword == "" ||
      this.signupForm.value.password != this.signupForm.value.repassword) {
      return;
    }

    let names: string[] = this.signupForm.value.name.split(" ");
    let first_name : any = names.shift();
    let last_name : string = "";
    names.forEach(name => last_name + name);
    let email = this.signupForm.value.email;
    let password = this.signupForm.value.password;

    let data = {
      "first_name":first_name,
      "last_name":first_name,
      "email":email,
      "password":password
    };
    this.authService.signup(data).subscribe(
      () => {
        this.router.navigate(["login"]).then(() => window.location.reload())
      }
    );
  }

  ngOnInit(): void {
  }

}
