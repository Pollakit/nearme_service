# accounts/view.py

from django.shortcuts import render
from rest_framework import generics

from .models import CustomUser, Customer, ShopOwner, MarketAdmin
from .serializers import CustomUserSerializer, CustomerSerializer, ShopOwnerSerializer, MarketAdminSerializer


# User
class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


# Customer
class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDetail(generics.RetrieveUpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


# ShopOwner
class ShopOwnerList(generics.ListCreateAPIView):
    queryset = ShopOwner.objects.all()
    serializer_class = ShopOwnerSerializer


class ShopOwnerDetail(generics.RetrieveUpdateAPIView):
    queryset = ShopOwner.objects.all()
    serializer_class = ShopOwnerSerializer


# MarketAdmin
class MarketAdminList(generics.ListAPIView):
    queryset = MarketAdmin.objects.all()
    serializer_class = MarketAdminSerializer


class MarketAdminDetail(generics.RetrieveAPIView):
    queryset = MarketAdmin.objects.all()
    serializer_class = MarketAdminSerializer
