from django.contrib import admin
from .models import Transaction, Investment, TaxReserveSetting, MonthlyLiquidity, Product

# Register your models here.
admin.site.register(Transaction)
admin.site.register(Investment)
admin.site.register(TaxReserveSetting)
admin.site.register(MonthlyLiquidity)
admin.site.register(Product)

