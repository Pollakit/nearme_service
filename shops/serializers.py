# shops/serializers.py
from rest_framework import serializers
from .models import (ShopCategory,
                     Shop, ShopImages,
                     MenuCategory,
                     Product, ProductImages,
                     Decorator,
                     CustomerFavoriteShop)

from markets.serializers import RoughMarketSerializer
from accounts.serializers import CustomerSerializer, ShopOwnerSerializer


# ShopCategory
class ShopCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopCategory
        fields = ['id', 'name', ]


# ShopImages
class ShopImagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShopImages
        fields = ['shop', 'image']


# Shop
class RoughShopSerializer(serializers.ModelSerializer):
    categories = ShopCategorySerializer(many=True)

    class Meta:
        model = Shop
        fields = ['id', 'name', 'main_image', 'categories', ]
        read_only_fields = ['id', 'name', 'main_image', 'categories', ]


class ShopSerializer(serializers.ModelSerializer):
    more_images = serializers.SerializerMethodField("getMoreImages")

    class Meta:
        model = Shop
        fields = ['id', 'shopOwner', 'market', 'name', 'main_image', 'more_images',
                  'desc', 'categories', 'promptpayIdentifier', 'created_at', 'is_active', ]
        read_only_fields = ['id', 'created_at']
        extra_kwargs = {'more_images': {'required': False},
                        'deliveryLocations': {'required': False}}
        # extra_kwargs = {"more_images": {"required": False, "allow_null": True}}

    def getMoreImages(self, obj):
        return ShopImagesSerializer(obj.shopimages_set.all(), many=True).data

    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('more_images')

        # pop categories out of validated data and add it after shop is created
        if('categories' in validated_data.keys()):
            categories = validated_data.pop('categories')

        # create shop
        try:
            shop = Shop.objects.create(**validated_data)
            for category in categories:
                shop.categories.add(category)

        except TypeError:
            msg = (
                'Got a `TypeError` when calling `Market.objects.create()`.'
            )
            raise TypeError(msg)

        # create shop images
        try:
            for image_data in images_data:
                # img = MarketImages.objects.create()
                # img.image = image.get('image')
                # img.save()
                image, created = ShopImages.objects.get_or_create(
                    shop=shop, image=image_data)

            return shop

        except TypeError:
            shop = shop.objects.get(pk=shop.id)
            shop.delete()
            msg = (
                'Got a `TypeError` when calling `Image.objects.get_or_create()`.'
            )
            raise TypeError(msg)

        return shop

    def update(self, instance, validated_data):

        # update categories
        try:
            categories_data = validated_data.pop('categories')
        except:
            categories_data = None

        if categories_data is not None:
            instance.categories.set(categories_data)

        # Update more_images
        try:
            images_data = self.context['request'].FILES.getlist('more_images')
        except:
            images_data = None

        if images_data is not None:
            for image_data in images_data:
                image, created = ShopImages.objects.get_or_create(
                    image=image_data, shop=instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance


# MenuCategory
class RoughMenuCategorySerializer(serializers.ModelSerializer):

    shop = RoughShopSerializer(many=False)

    class Meta:
        model = MenuCategory
        fields = ['id', 'shop', 'name', ]


class MenuCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = MenuCategory
        fields = ['id', 'shop', 'name', 'desc', 'is_active', ]


# ProductImages
class ProductImagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImages
        fields = ['product', 'image']


# Product
class RoughProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'main_image', 'desc',
                  'price', ]


class ProductSerializer(serializers.ModelSerializer):
    more_images = serializers.SerializerMethodField("getMoreImages")

    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'main_image', 'more_images', 'desc',
                  'price', 'decorators', 'created_at', 'updated_at', 'is_active', ]

    def getMoreImages(self, obj):
        return ProductImagesSerializer(obj.productimages_set.all(), many=True).data

    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('more_images')
        main_image = self.context['request'].FILES.get('main_image')

        if('decorators' in validated_data.keys()):
            decorators = validated_data.pop('decorators')

        if('main_image' in validated_data.keys()):
            validated_data.pop('main_image')

        # create Product
        try:
            product = Product.objects.create(
                main_image=main_image, **validated_data)
            for decorator in decorators:
                product.decorators.add(decorator)

        except TypeError:
            msg = (
                'Got a `TypeError` when calling `Product.objects.create()`.'
            )
            raise TypeError(msg)

        # create product images
        try:
            for image_data in images_data:
                image, created = ProductImages.objects.get_or_create(
                    product=product, image=image_data)

            return product

        except TypeError:
            product = product.objects.get(pk=product.id)
            product.delete()
            msg = (
                'Got a `TypeError` when calling `Image.objects.get_or_create()`.'
            )
            raise TypeError(msg)

        return product

    def update(self, instance, validated_data):
        try:
            decorators_data = validated_data.pop('decorators')
        except:
            decorators_data = None

        if decorators_data is not None:
            instance.decorators.set(decorators_data)

        # Update more_images
        try:
            images_data = self.context['request'].FILES.getlist('more_images')
        except:
            images_data = None

        if images_data is not None:
            ProductImages.objects.filter(product=instance).delete()
            for image_data in images_data:
                image, created = ProductImages.objects.get_or_create(
                    image=image_data, product=instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance


# Decorator
class RoughDecoratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decorator
        fields = ['name', 'price']


class DecoratorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Decorator
        fields = ['id', 'shop', 'name', 'desc', 'price', 'created_at',
                  'updated_at', 'is_active', ]


# CustomerFavoriteShop
class CustomerFavoriteShopSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerFavoriteShop
        fields = ['id', 'customer', 'shop', ]
