from decimal import Decimal

from django.utils import timezone
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


class LiquiditySummaryView(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def _to_decimal(value):
        try:
            return Decimal(str(value or 0))
        except Exception:
            return Decimal("0")

    def get(self, request):
        company = get_user_company_or_raise(request.user)

        today = timezone.now().date()
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")
        category = request.query_params.get("category", "All")
        entry_type = request.query_params.get("type", "All")

        if not start_date:
            start_date = (today.replace(day=1)).isoformat()
        if not end_date:
            end_date = today.isoformat()

        tx_queryset = Transaction.objects.filter(
            company=company,
            date__date__gte=start_date,
            date__date__lte=end_date,
        )
        cost_queryset = CostItem.objects.filter(company=company)

        total_income = Decimal("0")
        total_expense = Decimal("0")
        signed_transaction_sum = Decimal("0")

        for tx in tx_queryset:
            amount = self._to_decimal(tx.total)
            if tx.type == "income":
                total_income += amount
                signed_transaction_sum += amount
            else:
                total_expense += amount
                signed_transaction_sum -= amount

        recurring_expense_per_month = Decimal("0")
        for item in cost_queryset:
            amount = self._to_decimal(item.amount)
            if item.period == "yearly":
                recurring_expense_per_month += amount / Decimal("12")
            else:
                recurring_expense_per_month += amount

        try:
            start_year, start_month = [int(p) for p in str(start_date)[:7].split("-")]
            end_year, end_month = [int(p) for p in str(end_date)[:7].split("-")]
            month_count = (end_year - start_year) * 12 + (end_month - start_month) + 1
            if month_count < 1:
                month_count = 1
        except Exception:
            month_count = 1

        recurring_expense_total = recurring_expense_per_month * Decimal(str(month_count))
        total_expense += recurring_expense_total

        total_net = total_income - total_expense
        average_cashflow = total_net / Decimal(str(month_count))
        operational_cashflow = signed_transaction_sum - recurring_expense_total

        filtered_income = Decimal("0")
        filtered_expense = Decimal("0")

        entries = []
        for tx in tx_queryset:
            amount = self._to_decimal(tx.total)
            is_income = tx.type == "income"
            entries.append(
                {
                    "category": "Einnahme" if is_income else "Ausgabe",
                    "type": "Einmalig",
                    "price": amount if is_income else -amount,
                }
            )

        for item in cost_queryset:
            amount = self._to_decimal(item.amount)
            entries.append(
                {
                    "category": "Ausgabe",
                    "type": "Jaehrlich" if item.period == "yearly" else "Monatlich",
                    "price": -amount,
                }
            )

        for entry in entries:
            category_ok = category == "All" or entry["category"] == category
            type_ok = entry_type == "All" or entry["type"] == entry_type
            if not category_ok or not type_ok:
                continue

            if entry["category"] == "Einnahme":
                filtered_income += entry["price"]
            else:
                filtered_expense += abs(entry["price"])

        return Response(
            {
                "startDate": start_date,
                "endDate": end_date,
                "monthCount": month_count,
                "totals": {
                    "income": total_income,
                    "expense": total_expense,
                    "net": total_net,
                },
                "filtered": {
                    "income": filtered_income,
                    "expense": filtered_expense,
                },
                "metrics": {
                    "averageCashflow": average_cashflow,
                    "operationalCashflow": operational_cashflow,
                    "recurringExpensePerMonth": recurring_expense_per_month,
                },
            }
        )