# orders/urls.py

from django.urls import path
from .views import (OrderList, OrderDetail, UpdateOrderStateView,
                    OrderedProductList,
                    CustomerOrderHistory, ShopSellHistory)

urlpatterns = [
    path('orders/', OrderList.as_view()),
    path('products/', OrderedProductList.as_view()),

    path('orders/<int:pk>/', OrderDetail.as_view()),
    path('state/<int:pk>/', UpdateOrderStateView.as_view()),

    # Record
    path('orders/customer/<int:pk>/', CustomerOrderHistory.as_view()),
    path('orders/shop/<int:pk>/', ShopSellHistory.as_view()),
]
