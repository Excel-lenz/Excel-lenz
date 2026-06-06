from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
 

class User(AbstractUser):
    companySetupDone = models.BooleanField(default=False)
    isMailVerified = models.BooleanField(default=False)


