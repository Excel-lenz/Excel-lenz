from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from .models import Transaction, Product
from .serializers import TransactionSerializer, ProductSerializer
from apps.companies.models import Company
from rest_framework.decorators import action
from rest_framework.response import Response

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["get"])
    def sales(self, request):

        company = request.user.company

        sales = Transaction.objects.filter(
            company=company,
            product__isnull=False
        ).order_by("-date")

        serializer = self.get_serializer(
            sales,
            many=True
        )

        return Response(serializer.data)

    def get_queryset(self):
        return Transaction.objects.filter(
            company__companyOwner=self.request.user
        )
    
    def perform_create(self, serializer):
        company = self.request.user.company
        serializer.save(company=company)


class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        company = self.request.user.company

        return Product.objects.filter(
            company=company
        ).order_by("-created_at")

    def perform_create(self, serializer):
        company = self.request.user.company
        serializer.save(company=company)


class ProductDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        company = Company.objects.get(
            companyOwner=self.request.user
        )

        return Product.objects.filter(
            company=company
        )