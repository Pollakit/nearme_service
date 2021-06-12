# shops/views.py
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import render

# Get all shop in a market + search
# Search shop in Customer deliveryLocation
# Search Food in Customer deliveryLocation

from django.shortcuts import render
from rest_framework import generics

# For search
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


from .models import (ShopCategory,
                     Shop,
                     MenuCategory,
                     Product,
                     Decorator,
                     CustomerFavoriteShop)
from .serializers import (ShopCategorySerializer,
                          ShopSerializer, RoughShopSerializer,
                          MenuCategorySerializer, RoughMenuCategorySerializer,
                          ProductSerializer, RoughProductSerializer,
                          DecoratorSerializer,
                          CustomerFavoriteShopSerializer)


# Shop
class ShopList(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer


class ShopDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer


class ShopListByMarket(generics.ListAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = RoughShopSerializer

    def get_queryset(self):
        marketID = self.kwargs['pk']
        return Shop.objects.filter(market__id=marketID, is_active=True)


class ShopSearch(generics.ListAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    # queryset = Shop.objects.all()
    serializer_class = RoughShopSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    # filterset_fields = ['name', 'desc']

    search_fields = ['name', 'desc', 'categories__name']
    ordering_fields = ['name']

    def get_queryset(self):
        marketID = self.kwargs['pk']
        return Shop.objects.filter(market__id=marketID, is_active=True)


# ShopCategory
class ShopCategoryList(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = ShopCategory.objects.all()
    serializer_class = ShopCategorySerializer


class ShopCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = ShopCategory.objects.all()
    serializer_class = ShopCategorySerializer


class ShopCategorySearch(generics.ListAPIView):
    queryset = ShopCategory.objects.all()
    serializer_class = ShopCategorySerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    # filterset_fields = ['name', 'desc']

    search_fields = ['name']
    ordering_fields = ['name']


# MenuCategory
class MenuCategoryList(generics.ListCreateAPIView):
    queryset = MenuCategory.objects.all()
    serializer_class = MenuCategorySerializer


class MenuCategoryListByShop(generics.ListAPIView):
    serializer_class = MenuCategorySerializer

    def get_queryset(self):
        shopID = self.kwargs['pk']
        return MenuCategory.objects.filter(shop__id=shopID)


class CustomerViewMenuCategoryListByShop(generics.ListAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = RoughMenuCategorySerializer

    def get_queryset(self):
        shopID = self.kwargs['pk']
        return MenuCategory.objects.filter(shop__id=shopID, is_active=True)


class MenuCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = MenuCategory.objects.all()
    serializer_class = MenuCategorySerializer


# Product
class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductListByMenuCategory(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        menuCategoryID = self.kwargs['pk']
        return Product.objects.filter(category__id=menuCategoryID)


class CustomerViewProductListByMenuCategory(generics.ListAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = RoughProductSerializer

    def get_queryset(self):
        menuCategoryID = self.kwargs['pk']
        return Product.objects.filter(category__id=menuCategoryID, is_active=True)


class ProductSearch(generics.ListAPIView):
    # queryset = Product.objects.all()
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = RoughProductSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    search_fields = ['name', 'desc']
    ordering_fields = ['name']

    def get_queryset(self):
        marketID = self.kwargs['pk']
        return Product.objects.filter(category__shop__market__id=marketID)


# class ProductListByMarket(generics.ListCreateAPIView):
#     serializer_class = ProductSerializer

#     # product -> category -> shop -> market
#     def get_queryset(self):
#         marketID = self.kwargs['pk']

#         shopID = Shop.objects.filter(market__id=marketID).only('id').all()
#         categoryID = MenuCategory.objects.filter(
#             shop__id__in=shopID).only('id').all()
#         return Product.objects.filter(category__id__in=categoryID)


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# Decorator
class DecoratorList(generics.ListCreateAPIView):
    queryset = Decorator.objects.all()
    serializer_class = DecoratorSerializer


class DecoratorListByShop(generics.ListCreateAPIView):
    serializer_class = DecoratorSerializer

    def get_queryset(self):
        shopID = self.kwargs['pk']
        return Decorator.objects.filter(shop__id=shopID)


class DecoratorListByProduct(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = DecoratorSerializer

    def get_queryset(self):
        productID = self.kwargs['pk']
        return Decorator.objects.filter(product__id=productID, is_active=True)


class DecoratorDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Decorator.objects.all()
    serializer_class = DecoratorSerializer


# CustomerFavoriteShop
class CustomerFavoriteShopList(generics.ListCreateAPIView):
    serializer_class = CustomerFavoriteShopSerializer
    queryset = CustomerFavoriteShop.objects.all()


class CustomerFavoriteShopByCustomer(generics.ListAPIView):
    serializer_class = CustomerFavoriteShopSerializer

    def get_queryset(self):
        customerID = self.kwargs['pk']
        return CustomerFavoriteShop.objects.filter(customer__id=customerID)


class CustomerFavoriteShopDelete(generics.RetrieveDestroyAPIView):
    serializer_class = CustomerFavoriteShopSerializer
    queryset = CustomerFavoriteShop.objects.all()

# active/ deactive categories, menu, decorator, shop
