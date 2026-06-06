from django.contrib import admin
from .models import Company

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("companyName", "companyType", "companyOwner")
    list_filter = ("companyType",)
    search_fields = ("companyName", "companyOwner__username")