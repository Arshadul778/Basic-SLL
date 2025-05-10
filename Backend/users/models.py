from django.db import models

# Create your models here.

from django.contrib.auth.models import User


class Bio(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='bio')
    full_name = models.CharField(max_length=255)
    nid = models.CharField(max_length=20, unique=True)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.full_name}"
