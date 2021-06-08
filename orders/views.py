from django.shortcuts import render
from rest_framework import generics

from .models import Order, OrderedProduct, OrderedDecorator
from .serializers import (OrderSerializer,
                          OrderedProductSerializer,
                          UpdateOrderStateSerializer)


# Order
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderDetail(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class UpdateOrderStateView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = UpdateOrderStateSerializer


# OrderedProduct
class OrderedProductList(generics.ListCreateAPIView):
    queryset = OrderedProduct.objects.all()
    serializer_class = OrderedProductSerializer


# History
class CustomerOrderHistory(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        customerID = self.kwargs['pk']
        return Order.objects.filter(customer__id=customerID)


class ShopSellHistory(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        shopID = self.kwargs['pk']
        return Order.objects.filter(shop__id=shopID)

# Shop


class UncompletedOrder(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        shopID = self.kwargs['pk']
        return Order.objects.filter(shop__id=shopID, state='ORDERED') | Order.objects.filter(shop__id=shopID, state='RECEIVED') | Order.objects.filter(shop__id=shopID, state='ORDERED') | Order.objects.filter(shop__id=shopID, state='DELIVERED')
