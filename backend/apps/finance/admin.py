from django.contrib import admin
from .models import Transaction, MonthlyLiquidity


# Register your models here.
admin.site.register(Transaction)
admin.site.register(MonthlyLiquidity)

