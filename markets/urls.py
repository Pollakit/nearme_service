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
    path('marketchains/', MarketChainList.as_view()),
    path('marketchains/search/', MarketChainSearch.as_view()),
    path('marketchains/<int:pk>/', MarketChainDetail.as_view()),
    path('openclosemarketchain/<int:pk>/', OpenCloseMarketChain.as_view()),

    path('markets/', MarketList.as_view()),
    #     path('markets/moreImage', MarketImageView.as_view()),
    path('markets/search/', MarketSearch.as_view()),
    #     path('market/<int:market_id>/moreImage/<int:image_id>', MarketImageView.as_view()),
    path('markets/deliveryLocation/<int:pk>/',
         MarketListByDeliveryLocation.as_view()),
    path('markets/marketchain/<int:pk>/', MarketListByMarketChain.as_view()),
    path('markets/<int:pk>/', MarketDetail.as_view()),
    path('openclosemarket/<int:pk>/', OpenCloseMarket.as_view()),


    path('favoriteLocation/', FavouriteLocationList.as_view()),
    path('favoriteLocation/<int:pk>/',
         FavouriteLocationDetail.as_view()),

    path('favoriteLocation/customer/<int:pk>/',
         CustomerFavouriteLocationDetail.as_view()),

    path('deliverylocations/', DeliveryLocationList.as_view()),
    path('deliverylocations/marketchain/<int:pk>/',
         DeliveryLocationListByMarketChain.as_view()),
    path('deliverylocations/<int:pk>/', DeliveryLocationDetail.as_view()),
]
