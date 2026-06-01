from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    MeSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        data["companySetupDone"] = user.companySetupDone
        data["isMailVerified"] = user.isMailVerified

        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            errors = {}

            for field, msgs in serializer.errors.items():
                errors[field] = {
                    "message": msgs[0],
                    "code": getattr(msgs[0], "code", None)
                }

            return Response(
                {
                    "success": False,
                    "errors": errors
                },
                status=status.HTTP_200_OK 
            )

        self.perform_create(serializer)
        return Response(
            {
                "success": True,
                "user": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

# IsAuthenticated ist hier sehr wichtig. Sensible Daten sollen NUR accessable sein, wenn der nutzer richtig Authentifiziert ist!!
class MeView(generics.RetrieveAPIView):
    serializer_class = MeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
