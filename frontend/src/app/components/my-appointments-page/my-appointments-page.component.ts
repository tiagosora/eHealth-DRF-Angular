import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Emitter } from 'src/app/emitters/emitters';
import { Appointment } from 'src/app/models/Appointment';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-my-appointments-page',
  templateUrl: './my-appointments-page.component.html',
  styleUrls: ['./my-appointments-page.component.css']
})
export class MyAppointmentsPageComponent implements OnInit {
  appointments!: Appointment[];
  control! : Appointment[]
  userId: any;
  userType: any;

  constructor(
    private appointmentService : AppointmentService,
    private AuthService: AuthenticationService,
  ) {
    this.appointments = []
  }

  deleteAppointment(appointmentId: any){
    this.appointmentService.deleteAppointment(appointmentId).subscribe()
    window.location.reload()
  }

  ngOnInit(): void {
    Emitter.userId.subscribe(
      u => {
        if (u != undefined) {
          this.appointmentService.getPatientAppointments(u).subscribe(
            (app) => {
              this.appointments = app
            }
          )
        }
    }); 
    this.AuthService.isAuthenticated();
  }
}
