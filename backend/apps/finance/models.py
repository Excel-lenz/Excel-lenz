from django.db import models
from apps.companies.models import Company
from decimal import Decimal

class Transaction(models.Model):
    TYPE_CHOICES = [
        ("income", "Income"),
        ("expense", "Expense"),
    ]

    company = models.ForeignKey("companies.Company", on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

    type = models.CharField(max_length=10, choices=TYPE_CHOICES)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def total(self):
        return self.price * self.quantity

    def save(self, *args, **kwargs):
        is_new = self.pk is None

        old_total = None
        if not is_new:
            old = Transaction.objects.get(pk=self.pk)
            old_total = old.total

        super().save(*args, **kwargs)

        new_total = self.total

        if self.type == "income":
            delta = new_total
        else:
            delta = -new_total

        if old_total is not None:
            if old.type == "income":
                delta -= old_total
            else:
                delta += old_total

        Company.objects.filter(pk=self.company_id).update(
            companyCapital=models.F("companyCapital") + Decimal(delta)
        )