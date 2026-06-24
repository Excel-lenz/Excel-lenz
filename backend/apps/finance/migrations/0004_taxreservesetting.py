from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("companies", "0004_alter_company_companyowner"),
        ("finance", "0003_investment"),
    ]

    operations = [
        migrations.CreateModel(
            name="TaxReserveSetting",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("reserve_rate", models.PositiveSmallIntegerField(default=35)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "company",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tax_reserve_setting",
                        to="companies.company",
                    ),
                ),
            ],
            options={
                "verbose_name": "Tax Reserve Setting",
                "verbose_name_plural": "Tax Reserve Settings",
            },
        ),
    ]
