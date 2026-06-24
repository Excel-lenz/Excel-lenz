from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("finance", "0002_transaction_delete_revenueitem"),
        ("companies", "0004_alter_company_companyowner"),
    ]

    operations = [
        migrations.CreateModel(
            name="Investment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("category", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True, default="")),
                ("cost", models.DecimalField(decimal_places=2, max_digits=12)),
                ("start_date", models.DateField()),
                ("status", models.CharField(choices=[("Geplant", "Geplant"), ("In Bearbeitung", "In Bearbeitung"), ("Abgeschlossen", "Abgeschlossen")], default="Geplant", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("company", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="investments", to="companies.company")),
            ],
            options={
                "ordering": ["-start_date", "-created_at"],
            },
        ),
    ]