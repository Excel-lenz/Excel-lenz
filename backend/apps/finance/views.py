from rest_framework import status, viewsets,  generics
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Transaction, Investment, TaxReserveSetting, CostItem, Product, Company
from .serializers import (
    TransactionSerializer,
    InvestmentSerializer,
    TaxReserveSettingSerializer,
    CostItemSerializer,
    ProductSerializer,
)
from rest_framework.permissions import IsAuthenticated


def get_user_company_or_raise(user):
    company = getattr(user, "company", None)

    if company is None:
        raise ValidationError("User has no company yet")

    return company


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(
            company__companyOwner=self.request.user
        )
    
    def perform_create(self, serializer):
        company = get_user_company_or_raise(self.request.user)
        serializer.save(company=company)


class InvestmentViewSet(viewsets.ModelViewSet):
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Investment.objects.filter(company__companyOwner=self.request.user)

    def perform_create(self, serializer):
        company = getattr(self.request.user, "company", None)

        if company is None:
            raise ValidationError("User has no company yet")

        serializer.save(company=company)


class TaxReserveSettingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = getattr(request.user, "company", None)

        if company is None:
            raise ValidationError("User has no company yet")

        setting, _ = TaxReserveSetting.objects.get_or_create(company=company)
        serializer = TaxReserveSettingSerializer(setting)
        return Response(serializer.data)

    def patch(self, request):
        company = getattr(request.user, "company", None)

        if company is None:
            raise ValidationError("User has no company yet")

        setting, _ = TaxReserveSetting.objects.get_or_create(company=company)
        serializer = TaxReserveSettingSerializer(
            setting,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class CostItemViewSet(viewsets.ModelViewSet):
    serializer_class = CostItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CostItem.objects.filter(company__companyOwner=self.request.user)

    def perform_create(self, serializer):
        company = getattr(self.request.user, "company", None)

        if company is None:
            raise ValidationError("User has no company yet")

        serializer.save(company=company)

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        company = get_user_company_or_raise(self.request.user)

        return Product.objects.filter(
            company=company
        ).order_by("-created_at")

    def perform_create(self, serializer):
        company = get_user_company_or_raise(self.request.user)
        serializer.save(company=company)


class ProductDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        company = get_user_company_or_raise(self.request.user)

        return Product.objects.filter(
            company=company
        )