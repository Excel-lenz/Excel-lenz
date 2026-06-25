from rest_framework import viewsets
from .models import Company
from .serializers import CompanySerializer
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes,action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer

    def get_queryset(self):
        return Company.objects.filter(id=self.request.user.company.id)

    def perform_create(self, serializer):
        user = self.request.user

        if Company.objects.filter(companyOwner=user).exists():
            raise ValidationError("User already has a company")

        company = serializer.save(companyOwner=user)

        user.companySetupDone = True
        user.company = company 
        user.save()

    @action(detail=False, methods=["get"])
    def capital(self, request):
        company = Company.objects.filter(companyOwner=request.user).first()
        return Response({"capital": company.companyCapital if company else 0})
    
    @action(detail=False, methods=["get"])
    def goal(self, request):
        company = Company.objects.filter(companyOwner=request.user).first()
        return Response({"goal": company.companyGoal if company else 0})

    

    
