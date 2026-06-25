from rest_framework import serializers
from .models import Transaction, Investment, TaxReserveSetting, CostItem, Product


class TransactionSerializer(serializers.ModelSerializer):
    total = serializers.ReadOnlyField()
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Transaction
        fields = "__all__"


class InvestmentSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(read_only=True)
    start_date = serializers.DateField(
        input_formats=["%Y-%m-%d", "%d.%m.%Y", "%d/%m/%Y", "%d-%m-%Y"]
    )

    class Meta:
        model = Investment
        fields = "__all__"


class TaxReserveSettingSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TaxReserveSetting
        fields = ["company", "reserve_rate", "updated_at"]

    def validate_reserve_rate(self, value):
        if value < 10 or value > 60:
            raise serializers.ValidationError("reserve_rate must be between 10 and 60")

        return value


class CostItemSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CostItem
        fields = ["id", "company", "cost_type", "name", "amount", "period", "created_at", "updated_at"]

class ProductSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"