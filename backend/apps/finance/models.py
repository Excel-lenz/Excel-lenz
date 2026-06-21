from django.db import models
from apps.companies.models import Company
from decimal import Decimal
from django.utils.timezone import now
import uuid

class Transaction(models.Model):
    TYPE_CHOICES = [
        ("income", "Income"),
        ("expense", "Expense"),
    ]

    transaction_ID = models.CharField(max_length=30,unique=False,blank=True,null=True)
    company = models.ForeignKey("companies.Company", on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    product = models.ForeignKey("finance.Product",on_delete=models.SET_NULL,null=True,blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    net_amount = models.DecimalField(max_digits=15,decimal_places=2,default=0 )
    quantity = models.PositiveIntegerField()

    date = models.DateTimeField(default=now)   # NEW
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # NEW
    tax_amount = models.DecimalField(max_digits=15,decimal_places=2,default=0)
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

        gross_total = self.total

        self.tax_amount = (
            gross_total * Decimal(str(self.tax_rate or 0)) / Decimal("100")
        )

        self.net_amount = gross_total - self.tax_amount

        if not self.transaction_ID:
            self.transaction_ID = f"TX-{uuid.uuid4().hex[:8].upper()}"


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

        #monatliche Liquidität
        timestamp = self.date or now()

        year = timestamp.year
        month = timestamp.month

        monthly, _ = MonthlyLiquidity.objects.get_or_create(
            company=self.company,
            year=year,
            month=month
        )
        if self.type == "income":
            monthly.income += new_total
            monthly.liquidity += new_total

            monthly.net_income += self.net_amount
            monthly.net_liquidity += self.net_amount

        else:
            monthly.expenses += new_total
            monthly.liquidity -= new_total

            monthly.net_expenses += self.net_amount
            monthly.net_liquidity -= self.net_amount

        monthly.save()

class MonthlyLiquidity(models.Model):
    company = models.ForeignKey(
        "companies.Company",
        on_delete=models.CASCADE
    )

    year = models.IntegerField()
    month = models.IntegerField()

    net_income = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0
    )

    net_expenses = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0
    )

    net_liquidity = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0
    )
    income = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0
    )

    expenses = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0
    )

    liquidity = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0
    )

    class Meta:
        unique_together = ("company", "year", "month")

class Product(models.Model):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="products"
    )

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    category = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name