from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.utils.serializer_helpers import ReturnDict, ReturnList
from rest_framework.fields import ErrorDetail
from rest_framework.response import Response
from rest_framework import status


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {
            "username": {"validators": []},
            "email": {"validators": []},
        }

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username already exists.",
                code="103"
            )
        
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists.",
                code="102"
            )
        
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


    def validate(self, attrs):
        user = authenticate(
            username=attrs["username"],
            password=attrs["password"]
        )

        if user is None:
            raise serializers.ValidationError(
                "Ungültige Anmeldedaten",
                code="104"
            )

        attrs["user"] = user
        return attrs
    

class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
        )


