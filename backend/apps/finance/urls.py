from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TransactionViewSet,
    InvestmentViewSet,
    TaxReserveSettingView,
    CostItemViewSet,
    LiquiditySummaryView,
    ProductListCreateView,
    ProductDetailView,
    FinanceForecastView,
)

router = DefaultRouter()
router.register(r"transactions", TransactionViewSet, basename="transaction")
router.register(r"investments", InvestmentViewSet, basename="investment")
router.register(r"cost-items", CostItemViewSet, basename="cost-item")

urlpatterns = [
    path("", include(router.urls)),
    path("tax-reserve/", TaxReserveSettingView.as_view(), name="tax-reserve-setting"),
    path("liquidity-summary/", LiquiditySummaryView.as_view(), name="liquidity-summary"),
    path( "products/", ProductListCreateView.as_view(),name="products"),
    path("products/<int:pk>/",ProductDetailView.as_view(), name="product-detail"),
    path("forecast/",FinanceForecastView.as_view(),name="forecast",),
]