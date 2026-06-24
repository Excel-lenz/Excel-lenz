from decimal import Decimal

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.finance.models import TaxReserveSetting, Transaction


class TaxSummaryView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		company = getattr(request.user, "company", None)

		if company is None:
			return Response(
				{"detail": "User has no company yet"},
				status=400,
			)

		transactions = Transaction.objects.filter(company=company)
		reserve_setting, _ = TaxReserveSetting.objects.get_or_create(company=company)

		income_sum = Decimal("0")
		expense_sum = Decimal("0")

		for transaction in transactions:
			total = Decimal(transaction.total)

			if transaction.type == "income":
				income_sum += total
			else:
				expense_sum += total

		profit_before_tax = income_sum - expense_sum

		trade_tax = max(profit_before_tax * Decimal("0.14"), Decimal("0"))
		corporate_tax = (
			max(profit_before_tax * Decimal("0.15"), Decimal("0"))
			if company.companyLegalForm in {"GmbH", "UG", "AG", "SE"}
			else Decimal("0")
		)

		collected_sales_tax = income_sum * Decimal("0.19")
		deductible_input_tax = expense_sum * Decimal("0.19")
		total_estimated_tax = trade_tax + corporate_tax

		return Response(
			{
				"currency": company.companyCurrency or "EUR",
				"locale": "de-DE",
				"legalForm": company.companyLegalForm or "Einzelunternehmen",
				"profitBeforeTax": float(profit_before_tax),
				"availableCapital": float(company.companyCapital),
				"estimatedTax": {
					"tradeTax": float(trade_tax),
					"corporateTax": float(corporate_tax),
				},
				"taxReserve": {
					"recommendedReserve": float(total_estimated_tax * Decimal("1.10")),
					"reserveRate": reserve_setting.reserve_rate,
				},
				"salesTax": {
					"collectedSalesTax": float(collected_sales_tax),
					"deductibleInputTax": float(deductible_input_tax),
				},
				"profitAfterTax": float(profit_before_tax - total_estimated_tax),
				"totalEstimatedTax": float(total_estimated_tax),
			}
		)
