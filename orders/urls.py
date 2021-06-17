# orders/urls.py

from django.urls import path
from .views import (OrderList, OrderDetail, UpdateOrderStateView,
                    OrderedProductList,
                    CustomerOrderHistory, ShopSellHistory,
                    UncompletedOrder)

urlpatterns = [
    path('orders/', OrderList.as_view()),                       # GET POST
    path('products/', OrderedProductList.as_view()),            # GET POST

    path('orders/<int:pk>/', OrderDetail.as_view()),            # GET
    path('state/<int:pk>/', UpdateOrderStateView.as_view()),    # PATCH

    # Record
    path('orders/customer/<int:pk>/', CustomerOrderHistory.as_view()),  # GET
    path('orders/shop/<int:pk>/', ShopSellHistory.as_view()),   # GET

    path('uncompleteOrder/shop/<int:pk>/', UncompletedOrder.as_view()),  # GET
]
