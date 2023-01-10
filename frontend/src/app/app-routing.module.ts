import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { NewAppointmentPageComponent } from './components/new-appointment-page/new-appointment-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyAppointmentsPageComponent } from './components/my-appointments-page/my-appointments-page.component';
import { UpdateAppointmentPageComponent } from './components/update-appointment-page/update-appointment-page.component';
import { MyPrescriptionsPageComponent } from './components/my-prescriptions-page/my-prescriptions-page.component';
import { DepartmentsPageComponent } from './components/departments-page/departments-page.component';
import { MyDepartmentsPageComponent } from './components/my-departments-page/my-departments-page.component';
import { DoctorsPageComponent } from './components/doctors-page/doctors-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { CreatePrescriptionPageComponent } from './components/create-prescription-page/create-prescription-page.component';
import { UpdateDepartmentPageComponent } from './components/update-department-page/update-department-page.component';

const routes: Routes = [
  // Here we insert the routes
  { path: '', component: IndexPageComponent, pathMatch: 'full' }, // Create the base page
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'appointment', component: NewAppointmentPageComponent },
  { path: 'myappointments', component: MyAppointmentsPageComponent},
  { path: 'myappointments/updateappointment/:id', component: UpdateAppointmentPageComponent},
  { path: 'myprescriptions', component: MyPrescriptionsPageComponent},
  { path: 'myappointmentsdoctor', component: MyDepartmentsPageComponent},
  { path: 'departments', component: DepartmentsPageComponent},
  { path: 'doctors', component: DoctorsPageComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'createprescription', component: CreatePrescriptionPageComponent},
  { path: 'departments/updatedepartment/:str', component: UpdateDepartmentPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
