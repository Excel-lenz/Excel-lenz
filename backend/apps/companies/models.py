from django.db import models
from django.conf import settings

# Create your models here.

class Company(models.Model):

    companyName = models.CharField(max_length=255, default="") # Unternehmensname
    companyType = models.CharField(max_length=255, default="") # Wirtschaftssektor
    companyLocation = models.CharField(max_length=255, default="") # Unternehmenssitz
    companyLegalForm = models.CharField(max_length=255, default="") # Rechtsform
    companyCurrency = models.CharField(max_length=255, default="EUR") # Währung
    companyCapital = models.IntegerField(default=0) # Unternehmens - Kapital
    companyGoal = models.IntegerField(default=0) # Unternehmens - Ziel

    companyOwner = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
        related_name="company"
    )
