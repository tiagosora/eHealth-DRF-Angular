from drf_api.models import *
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username', 'password', 'is_patient', 'is_doctor', 'is_dean')

class PatientSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Patient
        fields = ('user',)

class DoctorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Doctor
        fields = ('user',)

class DeanSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Dean
        fields = ('user',)

class DepartmentSerializer(serializers.ModelSerializer):
    doctors = DoctorSerializer(many = True, read_only=True)
    class Meta:
        model = Department
        fields = ('name', 'doctors')
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('id', 'patient', 'department', 'date', 'message')

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ('id', 'patient', 'doctor', 'date', 'message')