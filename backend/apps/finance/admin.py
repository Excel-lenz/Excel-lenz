from django.contrib import admin
from .models import Transaction, MonthlyLiquidity, Product


# Register your models here.
admin.site.register(Transaction)
admin.site.register(MonthlyLiquidity)
admin.site.register(Product)

