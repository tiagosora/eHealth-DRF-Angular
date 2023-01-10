from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

class User(AbstractUser):
    is_patient = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=False)
    is_dean = models.BooleanField(default=False)

    def __str__(self):
        if self.is_patient == True:
            return str(f"User [ID: {self.id}, Name: {self.first_name} {self.last_name}, PATIENT]")
        elif self.is_doctor == True:
            return str(f"User [ID: {self.id}, Name: {self.first_name} {self.last_name}, DOCTOR]")
        elif self.is_dean == True:
            return str(f"User [ID: {self.id}, Name: {self.first_name} {self.last_name}, DEAN]")
        elif self.first_name != "" and self.first_name != None:
            return str(f"User [ID: {self.id}, Name: {self.first_name} {self.last_name}]")
        else:
            return str(f"User [ID: {self.id}, Username: {self.username}]")

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return str(f"Patient [ID: {self.user.id}, Name: {self.user.first_name} {self.user.last_name}, Email: {self.user.email}]")

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return str(f"Doctor [ID: {self.user.id}, Name: {self.user.first_name} {self.user.last_name}, Email: {self.user.email}]")

class Dean(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return str(f"Dean [ID: {self.user.id}, Name: {self.user.first_name} {self.user.last_name}, Email: {self.user.email}]")

class Department(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    doctors = models.ManyToManyField(Doctor)

    def __str__(self):
        return str(f"Department [Name: {self.name}, Doctors: ") + str([d.user.id for d in  self.doctors.all()]) + " ]"

class Appointment(models.Model):
    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    date = models.DateField()
    message = models.CharField(max_length=200)

    def __str__(self):
        return str(f"Appointment [ID: {self.id}, Patient: {self.patient.user.id}, Department: {self.department.name}, Date: {self.date}]")

class Prescription(models.Model):
    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    message = models.CharField(max_length=200)

    def __str__(self):
        return str(f"Prescription [ID: {self.id}, Patient: {self.patient.user. id}, Doctor: {self.doctor.user.id}, Date: {self.date}, Message: {self.message}]")