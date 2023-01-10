import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentService } from './services/department/department.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasePageComponent } from './components/base-page/base-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { NewAppointmentPageComponent } from './components/new-appointment-page/new-appointment-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MyAppointmentsPageComponent } from './components/my-appointments-page/my-appointments-page.component';
import { UpdateAppointmentPageComponent } from './components/update-appointment-page/update-appointment-page.component';
import { MyPrescriptionsPageComponent } from './components/my-prescriptions-page/my-prescriptions-page.component';
import { DepartmentsPageComponent } from './components/departments-page/departments-page.component';
import { MyDepartmentsPageComponent } from './components/my-departments-page/my-departments-page.component';
import { DoctorsPageComponent } from './components/doctors-page/doctors-page.component';
import { CreatePrescriptionPageComponent } from './components/create-prescription-page/create-prescription-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { UpdateDepartmentPageComponent } from './components/update-department-page/update-department-page.component';
@NgModule({
  declarations: [
    AppComponent,
    BasePageComponent,
    IndexPageComponent,
    FooterComponent,
    AboutPageComponent,
    NewAppointmentPageComponent,
    ContactPageComponent,
    LoginComponent,
    SignupComponent,
    MyAppointmentsPageComponent,
    UpdateAppointmentPageComponent,
    MyPrescriptionsPageComponent,
    DepartmentsPageComponent,
    MyDepartmentsPageComponent,
    DoctorsPageComponent,
    CreatePrescriptionPageComponent,
    ProfilePageComponent,
    UpdateDepartmentPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  providers: [DepartmentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
