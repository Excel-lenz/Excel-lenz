from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"
        read_only_fields = ["companyOwner"]