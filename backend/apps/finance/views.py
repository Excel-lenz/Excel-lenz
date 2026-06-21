from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Transaction
from .models import Product
from .serializers import TransactionSerializer
from .serializers import ProductSerializer
from apps.companies.models import Company

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

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


# ===== NEW =====
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