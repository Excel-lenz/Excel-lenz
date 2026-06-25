from django.urls import path

from .views import TaxSummaryView

urlpatterns = [
    path("tax-summary/", TaxSummaryView.as_view()),
]