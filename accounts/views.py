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


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class UserViewCustomerDetail(generics.ListAPIView):
    serializer_class = CustomerSerializer

    def get_queryset(self):
        userID = self.kwargs['pk']
        return Customer.objects.filter(user__id=userID)


# ShopOwner
class ShopOwnerList(generics.ListCreateAPIView):
    queryset = ShopOwner.objects.all()
    serializer_class = ShopOwnerSerializer


class ShopOwnerDetail(generics.RetrieveUpdateAPIView):
    queryset = ShopOwner.objects.all()
    serializer_class = ShopOwnerSerializer


class UserViewShopOwnerDetail(generics.ListAPIView):
    serializer_class = ShopOwnerSerializer

    def get_queryset(self):
        userID = self.kwargs['pk']
        return ShopOwner.objects.filter(user=userID)


# MarketAdmin
class MarketAdminList(generics.ListAPIView):
    queryset = MarketAdmin.objects.all()
    serializer_class = MarketAdminSerializer


class MarketAdminDetail(generics.RetrieveAPIView):
    queryset = MarketAdmin.objects.all()
    serializer_class = MarketAdminSerializer


class UserViewMarketAdminDetail(generics.ListAPIView):
    serializer_class = MarketAdminSerializer

    def get_queryset(self):
        userID = self.kwargs['pk']
        return MarketAdmin.objects.filter(user=userID)
