import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Emitter } from 'src/app/emitters/emitters';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit {

  faEnvelope = faEnvelope
  faPhone = faPhone

  is_authenticated: boolean;
  userType: any;

  constructor(
    private AuthService: AuthenticationService,
  ) {
    this.is_authenticated = false;
  }

  getUserData() {
    Emitter.isAuthenticated.subscribe(
      auth => {
        this.is_authenticated = auth;
      }
    )
    Emitter.usertype.subscribe(
      t => {
        this.userType = t;
    });
  }

  ngOnInit(): void {
    this.getUserData();
    this.AuthService.isAuthenticated();
  }

  logout(): void {
    // let data = {email : "a@a", password : "123456"}
    this.AuthService.logout();
  }

}
