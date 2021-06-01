# accounts\admin.py
from django.contrib import admin
from .models import CustomUser, Customer, ShopOwner, MarketAdmin

admin.site.register(CustomUser)
admin.site.register(Customer)
admin.site.register(ShopOwner)
admin.site.register(MarketAdmin)
