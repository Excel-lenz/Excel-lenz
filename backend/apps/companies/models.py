from django.db import models
from django.conf import settings

# Create your models here.

class Company(models.Model):
    COMPANY_TYPES = [
        ("primary", "Primärsektor"),
        ("secondary", "Sekundärsektor"),
        ("tertiary", "Tertiärsektor"),
    ]

    companyName = models.CharField(max_length=255)
    companyType = models.CharField(max_length=20, choices=COMPANY_TYPES)
    companyOwner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="companies"
    )
