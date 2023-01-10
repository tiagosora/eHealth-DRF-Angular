from django.contrib import admin
from drf_api.models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Dean)
admin.site.register(Department)
admin.site.register(Appointment)
admin.site.register(Prescription)