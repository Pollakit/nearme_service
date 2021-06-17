# markets/urls.py

from django.urls import path
from .views import (MarketChainList, MarketChainSearch, MarketChainDetail,
                    MarketList, MarketSearch, MarketListByMarketChain, MarketListByDeliveryLocation, MarketDetail,
                    FavouriteLocationList, CustomerFavouriteLocationDetail, FavouriteLocationDetail,
                    DeliveryLocationList, DeliveryLocationListByMarketChain, DeliveryLocationDetail,
                    OpenCloseMarketChain, OpenCloseMarket)
#
#                     DeliveryLocationList, DeliveryLocationListByMarket,
#                     DeliveryLocationListByMarketChain, DeliveryLocationDetail

urlpatterns = [
    path('marketchains/', MarketChainList.as_view()),                      # GET
    path('marketchains/search/', MarketChainSearch.as_view()),             # GET
    path('marketchains/<int:pk>/', MarketChainDetail.as_view()),           # GET
    path('openclosemarketchain/<int:pk>/',
         OpenCloseMarketChain.as_view()),                                  # GET PATCH


    # GET POST
    path('markets/', MarketList.as_view()),
    path('markets/search/', MarketSearch.as_view()),                       # GET
    path('markets/deliveryLocation/<int:pk>/',
         MarketListByDeliveryLocation.as_view()),                          # GET
    path('markets/marketchain/<int:pk>/',
         MarketListByMarketChain.as_view()),  # GET
    path('markets/<int:pk>/', MarketDetail.as_view()
         ),                     # GET PATCH DELETE
    path('openclosemarket/<int:pk>/',
         OpenCloseMarket.as_view()),          # GET PATCH


    path('favoriteLocation/', FavouriteLocationList.as_view()),            # GET POST
    path('favoriteLocation/<int:pk>/',
         FavouriteLocationDetail.as_view()),                               # GET PATCH DELETE

    path('favoriteLocation/customer/<int:pk>/',
         CustomerFavouriteLocationDetail.as_view()),                       # GET

    path('deliverylocations/', DeliveryLocationList.as_view()),            # GET
    path('deliverylocations/marketchain/<int:pk>/',
         DeliveryLocationListByMarketChain.as_view()),                     # GET
    path('deliverylocations/<int:pk>/',
         DeliveryLocationDetail.as_view()),  # GET PATCH DELETE
]
