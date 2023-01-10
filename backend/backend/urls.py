"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from drf_api import views

# from drf_api.views import LoginView, LogoutView, UserView

urlpatterns = [
    path('admin/', admin.site.urls),

    # developed web services
    path('ws/patients', views.getAllPatients),
    path('ws/patient/update/<int:id>', views.updatePatient),
    path('ws/patient/<int:id>', views.getPatient),

    path('ws/doctors', views.getAllDoctors),
    path('ws/doctor/create', views.createDoctor),
    path('ws/doctor/update/<int:id>', views.updateDoctor),
    path('ws/doctor/delete/<int:id>', views.deleteDoctor),
    path('ws/doctor/<int:id>', views.getDoctor),

    path('ws/deans', views.getAllDeans),
    path('ws/dean/create', views.createDean),
    path('ws/dean/update/<int:id>', views.updateDean),
    path('ws/dean/delete/<int:id>', views.deleteDean),
    path('ws/dean/<int:id>', views.getDean),

    path('ws/appointments', views.getAllAppointments),
    path('ws/appointment/create', views.createAppointment),
    path('ws/appointment/update/<int:id>', views.updateAppointment),
    path('ws/appointment/delete/<int:id>', views.deleteAppointment),
    path('ws/appointment/<int:id>', views.getAppointment),
    path('ws/appointment/patient/<int:id>', views.getPatientAppointments),
    path('ws/appointment/department/<str:name>', views.getDepartmentAppointments),

    path('ws/departments', views.getAllDepartments),
    path('ws/department/create', views.createDepartment),
    path('ws/department/update/<str:name>', views.updateDepartment),
    path('ws/department/delete/<str:name>', views.deleteDepartment),
    path('ws/department/<str:name>', views.getDepartment),
    path('ws/department/doctor/<int:id>', views.getDoctorDepartments),

    path('ws/prescriptions', views.getAllPrescriptions),
    path('ws/prescription/create', views.createPrescription),
    path('ws/prescription/update/<int:id>', views.updatePrescription),
    path('ws/prescription/delete/<int:id>', views.deletePrescription),
    path('ws/prescription/<int:id>', views.getPrescription),
    path('ws/prescription/patient/<int:id>', views.getPatientPrescriptions),
    path('ws/prescription/doctor/<int:id>', views.getDoctorPrescriptions),

    path('ws/signup', views.signup),
    path('ws/login', views.login),
    path('ws/user', views.getUser),
    path('ws/user/<int:id>', views.getUserById),

]
