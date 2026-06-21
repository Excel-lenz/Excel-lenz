from rest_framework import serializers
from .models import Transaction
from .models import Product

class TransactionSerializer(serializers.ModelSerializer):
    total = serializers.ReadOnlyField()
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Transaction
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"