from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (ProductListCreateView,ProductDetailView,TransactionViewSet,)

router = DefaultRouter()
router.register(r"transactions", TransactionViewSet, basename="transaction")

urlpatterns = [
    path(
        "",
        include(router.urls)
    ),

    path(
        "products/",
        ProductListCreateView.as_view(),
        name="products"
    ),

    # ===== NEW =====
    path(
        "products/<int:pk>/",
        ProductDetailView.as_view(),
        name="product-detail"
    ),
]