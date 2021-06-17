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
    path('shops/', ShopList.as_view()),                          # GET POST
    path('shops/market/<int:pk>/', ShopListByMarket.as_view()),  # GET
    path('shops/<int:pk>/', ShopDetail.as_view()
         ),               # GET PATCH DELETE
    path('shops/market/<int:pk>/search/', ShopSearch.as_view()),  # GET


    # ShopCategory
    path('shopcategories/', ShopCategoryList.as_view()),         # GET POST
    path('shopcategories/<int:pk>/',
         ShopCategoryDetail.as_view()),  # GET PATCH DELETE
    path('shopcategories/search/', ShopCategorySearch.as_view()),  # GET


    # MenuCategory
    path('menucategories/', MenuCategoryList.as_view()),         # GET POST
    path('menucategories/shop/<int:pk>/',
         MenuCategoryListByShop.as_view()),  # GET
    path('menucategories/<int:pk>/',
         MenuCategoryDetail.as_view()),  # GET PATCH DELETE
    path('menucategories/customer/shop/<int:pk>/',
         CustomerViewMenuCategoryListByShop.as_view()),          # GET

    # Product
    path('products/', ProductList.as_view()),                    # GET POST
    path('products/menucategory/<int:pk>/',                      # GET
         ProductListByMenuCategory.as_view()),
    path('products/customer/menucategory/<int:pk>/',             # GET
         CustomerViewProductListByMenuCategory.as_view()),

    path('products/market/<int:pk>/search/', ProductSearch.as_view()),  # GET
    #     path('products/market/<int:pk>/', ProductListByMarket.as_view()),
    # GET PATCH DELETE
    path('products/<int:pk>/', ProductDetail.as_view()),

    # Decorator
    path('decorators/', DecoratorList.as_view()),                # GET POST
    path('decorators/shop/<int:pk>/', DecoratorListByShop.as_view()),  # GET POST
    path('decorators/product/<int:pk>/',
         DecoratorListByProduct.as_view()),  # GET POST
    path('decorators/<int:pk>/', DecoratorDetail.as_view()),     # GET PATCH DELETE

    # Customer Favourite Shop
    path('favouriteShop/',                                       # GET POST
         CustomerFavoriteShopList.as_view()),
    path('favouriteShop/customer/<int:pk>/',                     # GET
         CustomerFavoriteShopByCustomer.as_view()),
    path('favouriteShop/<int:pk>/',                              # GET DELETE
         CustomerFavoriteShopDelete.as_view()),
]
