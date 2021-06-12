# shops/urls.py
from django.urls import path
from .views import (ShopCategoryList, ShopCategoryDetail, ShopCategorySearch,
                    ShopList, ShopListByMarket, ShopDetail, ShopSearch,
                    MenuCategoryList, MenuCategoryListByShop, CustomerViewMenuCategoryListByShop, MenuCategoryDetail,
                    ProductList, ProductListByMenuCategory, ProductDetail, ProductSearch, CustomerViewProductListByMenuCategory,
                    DecoratorList, DecoratorListByShop, DecoratorListByProduct, DecoratorDetail,
                    CustomerFavoriteShopList, CustomerFavoriteShopByCustomer, CustomerFavoriteShopDelete)
# ProductListByMarket,


urlpatterns = [
    # Shop
    path('shops/', ShopList.as_view()),
    path('shops/market/<int:pk>/', ShopListByMarket.as_view()),
    path('shops/<int:pk>/', ShopDetail.as_view()),
    path('shops/market/<int:pk>/search/', ShopSearch.as_view()),


    # ShopCategory
    path('shopcategories/', ShopCategoryList.as_view()),
    path('shopcategories/<int:pk>/', ShopCategoryDetail.as_view()),
    path('shopcategories/search/', ShopCategorySearch.as_view()),


    # MenuCategory
    path('menucategories/', MenuCategoryList.as_view()),
    path('menucategories/shop/<int:pk>/', MenuCategoryListByShop.as_view()),
    path('menucategories/<int:pk>/', MenuCategoryDetail.as_view()),
    path('menucategories/customer/shop/<int:pk>/',
         CustomerViewMenuCategoryListByShop.as_view()),

    # Product
    path('products/', ProductList.as_view()),
    path('products/menucategory/<int:pk>/',
         ProductListByMenuCategory.as_view()),
    path('products/customer/menucategory/<int:pk>/',
         CustomerViewProductListByMenuCategory.as_view()),

    path('products/market/<int:pk>/search/', ProductSearch.as_view()),
    #     path('products/market/<int:pk>/', ProductListByMarket.as_view()),
    path('products/<int:pk>/', ProductDetail.as_view()),

    # Decorator
    path('decorators/', DecoratorList.as_view()),
    path('decorators/shop/<int:pk>/', DecoratorListByShop.as_view()),
    path('decorators/product/<int:pk>/', DecoratorListByProduct.as_view()),
    path('decorators/<int:pk>/', DecoratorDetail.as_view()),

    # Customer Favourite Shop
    path('favouriteShop/',
         CustomerFavoriteShopList.as_view()),
    path('favouriteShop/customer/<int:pk>/',
         CustomerFavoriteShopByCustomer.as_view()),
    path('favouriteShop/<int:pk>/',
         CustomerFavoriteShopDelete.as_view()),
]
