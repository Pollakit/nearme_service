# markets\admin.py

from django.contrib import admin
from .models import MarketChain, Market, DeliveryLocation, MarketChainImages, MarketImages, CustomerFavoriteLocation

admin.site.register(MarketChain)
admin.site.register(Market)
admin.site.register(DeliveryLocation)
admin.site.register(MarketChainImages)
admin.site.register(MarketImages)
admin.site.register(CustomerFavoriteLocation)
