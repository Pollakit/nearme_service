# shops\admin.py

from django.contrib import admin
from .models import (ShopCategory, Shop, ShopImages,
                     MenuCategory, Decorator, Product, ProductImages,
                     CustomerFavoriteShop)


admin.site.register(Shop)
admin.site.register(ShopImages)
admin.site.register(ShopCategory)
admin.site.register(MenuCategory)
admin.site.register(Product)
admin.site.register(ProductImages)
admin.site.register(Decorator)
admin.site.register(CustomerFavoriteShop)
