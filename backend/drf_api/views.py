import datetime

import jwt
from drf_api.models import *
from drf_api.permissions import *
from drf_api.serializers import *
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.

#
#   U S E R S
#

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getUserById(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    return Response(serializer.data)

#
#   P A T I E N T E S
#

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getAllPatients(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getPatient(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        patient = Patient.objects.get(user=user)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PatientSerializer(patient)
    return Response(serializer.data)

@api_view(['PUT'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def updatePatient(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        patient = Patient.objects.get(user=user)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)

    data = serializer.data
    updated = False
    if request.data.get("first_name") and request.data.get("first_name") != "":
        data["first_name"] = request.data.get("first_name")
        updated = True
    if request.data.get("last_name") and request.data.get("last_name") != "":
        data["last_name"] = request.data.get("last_name")
        updated = True
    if request.data.get("email") and request.data.get("email") != "":
        data["email"] = request.data.get("email")
        updated = True
    if request.data.get("username") and request.data.get("username") != "":
        data["username"] = request.data.get("username")
        updated = True
    if request.data.get("password") and request.data.get("password") != "":
        data["password"] = request.data.get("password")
        updated = True

    if updated == False:
        return Response(PatientSerializer(patient).data)
    else:
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(PatientSerializer(patient).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#
#   D O C T O R S
#

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getAllDoctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def createDoctor(request):
    try:
        first_name = request.data["first_name"]
        last_name = request.data["last_name"]
        password = request.data["password"]
        email = request.data["email"]

        if email in [user.email for user in User.objects.all()]:
            return Response(status=status.HTTP_409_CONFLICT)

        init_username = first_name.lower() + last_name.lower()
        username = first_name.lower() + last_name.lower()

        username_id = 1
        while (username in [user.username for user in User.objects.all()]):
            username = init_username + str(username_id)
            username_id += 1

        data = {}
        data["first_name"] = first_name
        data["last_name"] = last_name
        data["password"] = password
        data["email"] = email
        data["username"] = username
        data["is_doctor"] = True
        
        user_serializer = UserSerializer(data=data)
        if user_serializer.is_valid():
            user = user_serializer.save()

            doctor_data = {}
            doctor_data["user"] = user.id

            serializer = DoctorSerializer(data=doctor_data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            else:
                user = User.objects.get(email=email)
                user.delete()

        return Response(serializer.errors, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getDoctor(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        doctor = Doctor.objects.get(user=user)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DoctorSerializer(doctor)
    return Response(serializer.data)

@api_view(['PUT'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def updateDoctor(request, id):
    print(request.data)
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        doctor = Doctor.objects.get(user=user)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)

    data = serializer.data
    updated = False
    if request.data.get("first_name"):
        data["first_name"] = request.data.get("first_name")
        updated = True
    if request.data.get("last_name"):
        data["last_name"] = request.data.get("last_name")
        updated = True
    if request.data.get("email"):
        data["email"] = request.data.get("email")
        updated = True
    if request.data.get("username"):
        data["username"] = request.data.get("username")
        updated = True
    if request.data.get("password"):
        data["password"] = request.data.get("password")
        updated = True

    if updated == False:
        return Response(DoctorSerializer(doctor).data)
    else:
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(DoctorSerializer(doctor).data)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def deleteDoctor(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        doctor = Doctor.objects.get(user=user)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    doctor.delete()
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

#
#   D E A N S
#

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getAllDeans(request):
    deans = Dean.objects.all()
    serializer = DeanSerializer(deans, many=True)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def createDean(request):
    try:
        first_name = request.data["first_name"]
        last_name = request.data["last_name"]
        password = request.data["password"]
        email = request.data["email"]

        if email in [user.email for user in User.objects.all()]:
            return Response(status=status.HTTP_409_CONFLICT)

        init_username = first_name.lower() + last_name.lower()
        username = first_name.lower() + last_name.lower()

        username_id = 1
        while (username in [user.username for user in User.objects.all()]):
            username = init_username + str(username_id)
            username_id += 1

        data = {}
        data["first_name"] = first_name
        data["last_name"] = last_name
        data["password"] = password
        data["email"] = email
        data["username"] = username
        data["is_dean"] = True
        
        user_serializer = UserSerializer(data=data)
        if user_serializer.is_valid():
            user = user_serializer.save()

            dean_data = {}
            dean_data["user"] = user.id

            serializer = DeanSerializer(data=dean_data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            else:
                user = User.objects.get(email=email)
                user.delete()

        return Response(serializer.errors, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getDean(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        dean = Dean.objects.get(user=user)
    except Dean.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DeanSerializer(dean)
    return Response(serializer.data)

@api_view(['PUT'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def updateDean(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        dean = Dean.objects.get(user=user)
    except Dean.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)

    data = serializer.data
    updated = False
    if request.data.get("first_name"):
        data["first_name"] = request.data.get("first_name")
        updated = True
    if request.data.get("last_name"):
        data["last_name"] = request.data.get("last_name")
        updated = True
    if request.data.get("email"):
        data["email"] = request.data.get("email")
        updated = True
    if request.data.get("username"):
        data["username"] = request.data.get("username")
        updated = True
    if request.data.get("password"):
        data["password"] = request.data.get("password")
        updated = True

    if updated == False:
        return Response(DeanSerializer(dean).data)
    else:
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(DeanSerializer(dean).data)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def deleteDean(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        dean = Dean.objects.get(user=user)
    except Dean.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    dean.delete()
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

#
#   A P P O I N T M E N T S
#

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getAllAppointments(request):
    appoitments = Appointment.objects.all()
    serializer = AppointmentSerializer(appoitments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getAppointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getPatientAppointments(request, id):
    appoitments = Appointment.objects.filter(patient=id)
    serializer = AppointmentSerializer(appoitments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getDepartmentAppointments(request, name):
    appoitments = Appointment.objects.filter(department=name)
    serializer = AppointmentSerializer(appoitments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def createAppointment(request):
    print(request.data)
    try:
        user = User.objects.get(id=request.data.get("patient"))
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        patient = Patient.objects.get(user=user)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    try:
        department = Department.objects.get(name=request.data.get("department"))
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.data.get("message"):
        message = request.data.get("message")
    else :
        message = "General Appointment"

    if request.data.get("date"):
        date = datetime.datetime.strptime(request.data.get("date"), '%Y-%m-%d').date()
    else :
        date = datetime.date.today()

    data = {}
    data["patient"] = patient.pk
    data["department"] = department.pk
    data["date"] = date
    data["message"] = message

    serializer = AppointmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def updateAppointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = AppointmentSerializer(appointment)

    data = serializer.data
    updated = False
    if request.data.get("patient"):
        try:
            user = User.objects.get(id=request.data.get("patient"))
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            patient = Patient.objects.get(user=user)
        except Patient.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data["patient"] = patient.pk
        updated = True
    if request.data.get("department"):
        try:
            department = Department.objects.get(name=request.data.get("department"))
        except Department.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data["department"] = department.pk
        updated = True
    if request.data.get("date"):
        data["date"] = request.data.get("date")
        updated = True
    if request.data.get("message"):
        data["message"] = request.data.get("message")
        updated = True

    if updated == False:
        return Response(AppointmentSerializer(appointment).data)
    else:
        serializer = AppointmentSerializer(appointment, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def deleteAppointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    appointment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


#
#   D E P A R T M E N T S
#

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getAllDepartments(request):
    departments = Department.objects.all()
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getDepartment(request, name):
    try:
        department = Department.objects.get(name=name)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DepartmentSerializer(department)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getDoctorDepartments(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        doctor = Doctor.objects.get(user=user)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    departments = Department.objects.filter(doctors__in=[doctor])
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def createDepartment(request):
    data = {}
    data["name"] = request.data["name"]
    data["doctors"] = []

    serializer = DepartmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def updateDepartment(request, name):
    try:
        department = Department.objects.get(name=name)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    updated = False
    if request.data.get("doctors") != None :
        doctors = []
        updated = True
        for doctor_id in request.data.get("doctors"):
            try:
                doctor = Doctor.objects.get(user=User.objects.get(id=doctor_id))
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
            doctors.append(doctor)
        department.doctors.set(doctors)
        
    if updated:
        serializer = DepartmentSerializer(department)
        return Response(serializer.data)
    else:
        return Response(DepartmentSerializer(department).data)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def deleteDepartment(request, name):
    try:
        department = Department.objects.get(name=name)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    department.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

#
#   P R E S C R I P T I O N S
#

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getAllPrescriptions(request):
    prescriptions = Prescription.objects.all()
    serializer = PrescriptionSerializer(prescriptions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getPrescription(request, id):
    try:
        prescription = Prescription.objects.get(id=id)
    except Prescription.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PrescriptionSerializer(prescription)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getPatientPrescriptions(request, id):
    prescriptions = Prescription.objects.filter(patient=id)
    serializer = PrescriptionSerializer(prescriptions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getDoctorPrescriptions(request, id):
    prescriptions = Prescription.objects.filter(doctor=id)
    serializer = PrescriptionSerializer(prescriptions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def createPrescription(request):
    try:
        user = User.objects.get(id=request.data.get("patient"))
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        patient = Patient.objects.get(user=user)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    try:
        user = User.objects.get(id=request.data.get("doctor"))
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        doctor = Doctor.objects.get(user=user)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = {}
    data["patient"] = patient.pk
    data["doctor"] = doctor.pk
    data["date"] = datetime.date.today()
    data["message"] = request.data.get("message")

    serializer = PrescriptionSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def updatePrescription(request, id):
    try:
        prescription = Prescription.objects.get(id=id)
    except Prescription.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PrescriptionSerializer(prescription)

    data = serializer.data
    updated = False
    if request.data.get("patient"):
        try:
            user = User.objects.get(id=request.data.get("patient"))
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            patient = Patient.objects.get(user=user)
        except Patient.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data["patient"] = patient.pk
        updated = True
    if request.data.get("doctor"):
        try:
            user = User.objects.get(id=request.data.get("doctor"))
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            doctor = Doctor.objects.get(user=user)
        except Doctor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data["doctor"] = doctor.pk
        updated = True
    if request.data.get("date"):
        data["date"] = request.data.get("date")
        updated = True
    if request.data.get("message"):
        data["message"] = request.data.get("message")
        updated = True

    if updated == False:
        return Response(PrescriptionSerializer(prescription).data)
    else:
        serializer = PrescriptionSerializer(prescription, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def deletePrescription(request, id):
    try:
        prescription = Prescription.objects.get(id=id)
    except Prescription.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    prescription.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

#
#   A U T H E N T I C A T I O N
#

@api_view(['POST'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def signup(request):
    print("signup")
    try:
        first_name = request.data["first_name"]
        last_name = request.data["last_name"]
        password = request.data["password"]
        email = request.data["email"]

        if email in [user.email for user in User.objects.all()]:
            return Response(status=status.HTTP_409_CONFLICT)

        init_username = first_name.lower() + last_name.lower()
        username = first_name.lower() + last_name.lower()

        username_id = 1
        while (username in [user.username for user in User.objects.all()]):
            username = init_username + str(username_id)
            username_id += 1

        data = {}
        data["first_name"] = first_name
        data["last_name"] = last_name
        data["password"] = password
        data["email"] = email
        data["username"] = username
        data["is_patient"] = True
        
        user_serializer = UserSerializer(data=data)
        if user_serializer.is_valid():
            user = user_serializer.save()

            patient_data = {}
            patient_data["user"] = user.id

            serializer = PatientSerializer(data=patient_data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            else:
                user = User.objects.get(email=email)
                user.delete()

        return Response(serializer.errors, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def login(request):
    email = request.data['email']
    password = request.data['password']

    user = User.objects.filter(email=email).first()
    if user is None:
        raise AuthenticationFailed('User not found!')
    if not user.password == password:
        raise AuthenticationFailed('Incorrect password!')

    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')

    # response = Response()
    response = Response(status=status.HTTP_202_ACCEPTED)
    response.set_cookie(key='jwt', value=token, httponly=True)
    response.data = {
        'jwt': token,
    }

    return response


@api_view(['GET'])
# @permission_classes([IsAuthenticated, IsPatient, IsDoctor, IsDean])
def getUser(request):
    token = request.headers['jwt']

    if not token: raise AuthenticationFailed()
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError: raise AuthenticationFailed()

    user = User.objects.get(id=payload['id'])
    serializer = UserSerializer(user)

    return Response(serializer.data)