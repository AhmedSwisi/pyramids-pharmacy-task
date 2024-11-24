from django.db import models
from django.contrib.auth.models import User

class Manufacturer(models.Model):

    name =models.CharField(max_length=50)

    def __str__(self):
        return self.name
class Medication(models.Model):

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=256)
    quantity = models.IntegerField()
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class RefillRequest(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        APPROVED = 'APPROVED', 'Approved'
        REJECTED = 'REJECTED', 'Rejected'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    requested_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.PENDING
    )

    def __str__(self):
        return f"{self.medication.name} refill request by {self.user.username} - {self.get_status_display()}"
    

