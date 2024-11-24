from django.contrib import admin
from .models import Manufacturer, Medication, RefillRequest

admin.site.register(Manufacturer)
admin.site.register(Medication)
admin.site.register(RefillRequest)
