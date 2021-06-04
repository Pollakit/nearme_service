# markets/view.py

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import render
from rest_framework import generics, status

# For search
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import (MarketChain, Market, MarketChainImages,
                     MarketImages, DeliveryLocation, CustomerFavoriteLocation,)
# from shops.models import Shop

from .serializers import (RoughMarketChainSerializer, DetailMarketChainSerializer,
                          RoughMarketSerializer, DetailMarketSerializer, FavoriteLocationSerializer, RoughFavoriteLocationSerializer,
                          DeliveryLocationSerializer, RoughDeliveryLocationSerializer, OpenCloseMarketChainSerializer, OpenCloseMarketSerializer,
                          MarketImagesSerializer)


##### For customer #####
# Get all marketChain + search

# MarketChain
class MarketChainList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = MarketChain.objects.filter(is_active=True)
    serializer_class = RoughMarketChainSerializer


class MarketChainDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = MarketChain.objects.all()
    serializer_class = DetailMarketChainSerializer


class MarketChainSearch(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = MarketChain.objects.all()
    serializer_class = RoughMarketChainSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    # filterset_fields = ['name', 'desc']

    search_fields = ['name', 'desc']
    ordering_fields = ['name']


# Market
# Get all market in marketChain + search
class MarketList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Market.objects.all()
    serializer_class = DetailMarketSerializer


class MarketListByMarketChain(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = RoughMarketSerializer

    def get_queryset(self):
        marketChainID = self.kwargs['pk']
        return Market.objects.filter(marketChain__id=marketChainID, is_active=True, marketChain__is_active=True)


class MarketSearch(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Market.objects.all()
    serializer_class = RoughMarketSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    search_fields = ['name', 'desc']
    ordering_fields = ['name']


# By deliveryLocation
class MarketListByDeliveryLocation(generics.ListAPIView):
    serializer_class = RoughMarketSerializer

    def get_queryset(self):
        userLocation = self.kwargs['pk']
        return Market.objects.filter(deliveryLocations__id=userLocation, is_active=True, marketChain__is_active=True)


# Favorite Customer's Location
class FavouriteLocationList(generics.ListCreateAPIView):
    queryset = CustomerFavoriteLocation.objects.all()
    serializer_class = FavoriteLocationSerializer


class FavouriteLocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomerFavoriteLocation.objects.all()
    serializer_class = FavoriteLocationSerializer


class CustomerFavouriteLocationDetail(generics.ListAPIView):
    serializer_class = FavoriteLocationSerializer

    def get_queryset(self):
        id = self.kwargs['pk']
        return CustomerFavoriteLocation.objects.filter(customer__id=id)


# All in marketChain DeliveryLocation
class DeliveryLocationListByMarketChain(generics.ListAPIView):
    serializer_class = RoughDeliveryLocationSerializer

    def get_queryset(self):
        marketChainID = self.kwargs['pk']
        return DeliveryLocation.objects.filter(created_for__id=marketChainID)


##### For MarketChain Admin #####
# Update Delete Market
class MarketDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Market.objects.all()
    serializer_class = DetailMarketSerializer


# Create/ Update DeliveryLocation
class DeliveryLocationList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = DeliveryLocation.objects.all()
    serializer_class = DeliveryLocationSerializer


class DeliveryLocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DeliveryLocation.objects.all()
    serializer_class = DeliveryLocationSerializer


# Open/Close marketChain
class OpenCloseMarketChain(generics.RetrieveUpdateAPIView):
    queryset = MarketChain.objects.all()
    serializer_class = OpenCloseMarketChainSerializer


# Open/Close market
class OpenCloseMarket(generics.RetrieveUpdateAPIView):
    queryset = Market.objects.all()
    serializer_class = OpenCloseMarketSerializer
