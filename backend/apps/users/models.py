from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
 

class User(AbstractUser):
    companySetupDone = models.BooleanField(default=False)
    isMailVerified = models.BooleanField(default=False)
    currentStreak = models.IntegerField(default=0)

    company = models.OneToOneField(
        "companies.Company",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="owner_user"
    )

    # Settings-Felder
    language = models.CharField(max_length=50, default="Deutsch")
    currency = models.CharField(max_length=10, default="EUR")
    numberFormat = models.CharField(max_length=50, default="Punkt")
    popupsEnabled = models.BooleanField(default=True)
    fiscalYearStart = models.CharField(max_length=50, default="Januar")
    budgetWarning = models.IntegerField(default=85)
    privacyMode = models.BooleanField(default=False)


