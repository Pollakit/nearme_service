# markets/serializers.py

from rest_framework import serializers
from .models import MarketChain, Market, DeliveryLocation, CustomerFavoriteLocation, MarketChainImages, MarketImages
from shops.models import Shop
import sys
import logging

logger = logging.getLogger(__name__)


# MarketChain
class MarketChainImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketChainImages
        fields = ['marketChain', 'image']


class RoughMarketChainSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketChain
        fields = ['id', 'marketAdmin', 'name', 'main_image', ]
        read_only_fields = ['id', 'marketAdmin', 'name', 'main_image', ]


class DetailMarketChainSerializer(serializers.ModelSerializer):
    more_images = serializers.SerializerMethodField("getMoreImages")

    class Meta:
        model = MarketChain
        fields = ['id', 'marketAdmin', 'name', 'main_image', 'more_images', 'desc',
                  'location', ]
        read_only_fields = ['id', 'more_images', ]

    def getMoreImages(self, obj):
        return MarketChainImagesSerializer(obj.marketchainimages_set.all(), many=True).data


# Market
class MarketImagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = MarketImages
        fields = ['market', 'image']


class RoughMarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = ['id', 'marketChain', 'name', 'main_image', ]
        read_only_fields = ['id', 'marketChain', 'name', 'main_image', ]


class DetailMarketSerializer(serializers.ModelSerializer):
    more_images = serializers.SerializerMethodField("getMoreImages")

    # more_images = MarketImagesSerializer(many=True, required=False)

    class Meta:
        model = Market
        fields = ['id', 'marketChain', 'name', 'main_image', 'more_images',
                  'desc', 'location', 'deliveryLocations', 'is_active', 'updated_at']
        extra_kwargs = {'more_images': {'required': False},
                        'deliveryLocations': {'required': False}}
        # extra_kwargs = {"more_images": {"required": False, "allow_null": True}}

    def getMoreImages(self, obj):
        return MarketImagesSerializer(obj.marketimages_set.all(), many=True).data

    def create(self, validated_data):
        # print(data, flush=True)
        # data.pop('more_images')
        # images_data = self.context.get('request').data.pop('more_images')
        # images_data = validated_data.pop('more_images')

        images_data = self.context['request'].FILES.getlist('more_images')
        main_image = self.context['request'].FILES.get('main_image')
        if('deliveryLocations' in validated_data.keys()):
            deliveryLocations = validated_data.pop('deliveryLocations')

        if('main_image' in validated_data.keys()):
            validated_data.pop('main_image')

        try:
            market = Market.objects.create(
                main_image=main_image, **validated_data)
            for location in deliveryLocations:
                market.deliveryLocations.add(location)

        except TypeError:
            msg = (
                'Got a `TypeError` when calling `Market.objects.create()`.'
            )
            raise TypeError(msg)

        try:
            for image_data in images_data:
                # img = MarketImages.objects.create()
                # img.image = image.get('image')
                # img.save()
                image, created = MarketImages.objects.get_or_create(
                    market=market, image=image_data)

            return market

        except TypeError:
            market = Market.objects.get(pk=market.id)
            market.delete()
            msg = (
                'Got a `TypeError` when calling `Image.objects.get_or_create()`.'
            )
            raise TypeError(msg)

        return market

    def update(self, instance, validated_data):
        # instance.marketChain = validated_data.get(
        #     'marketChain', instance.marketChain)
        # instance.name = validated_data.get('name', instance.name)
        # instance.desc = validated_data.get('desc', instance.desc)
        # instance.location = validated_data.get('location', instance.location)
        # instance.deliveryLocations = validated_data.get(
        #     'deliveryLocations', instance.deliveryLocations)

        # try:
        #     images_data = self.context.get('request').data.pop('images')
        # except:
        #     images_data = None

        # if images_data is not None:
        #     image_instance_list = []
        #     for image_data in images_data:
        #         image, created = MarketImages.objects.get_or_create(
        #             image=image_data)
        #         image_instance_list.append(image)

        #     instance.images.set(image_instance_list)

        # instance.save()

        # Update locations (ids)
        try:
            deliveryLocations_data = validated_data.pop('deliveryLocations')
        except:
            deliveryLocations_data = None

        if deliveryLocations_data is not None:
            instance.deliveryLocations.set(deliveryLocations_data)

        # Update more_images
        try:
            images_data = self.context['request'].FILES.getlist('more_images')
        except:
            images_data = None

        if images_data is not None:
            MarketImages.objects.filter(market=instance).delete()
            for image_data in images_data:
                image, created = MarketImages.objects.get_or_create(
                    image=image_data, market=instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance


# DeliveryLocation
class DeliveryLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryLocation
        fields = "__all__"


class RoughDeliveryLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryLocation
        fields = ("id", "name")
        read_only_fields = ("id", "name")


# FavoriteLocation
class FavoriteLocationSerializer(serializers.ModelSerializer):
    location = RoughDeliveryLocationSerializer

    class Meta:
        model = CustomerFavoriteLocation
        fields = ('id', "customer", "location", "is_main")


class RoughFavoriteLocationSerializer(serializers.ModelSerializer):
    location = RoughDeliveryLocationSerializer

    class Meta:
        model = CustomerFavoriteLocation
        fields = ("location", "is_main")
        read_only_fields = ("location", "is_main")


# Open/Close
# MarketChain
class OpenCloseMarketChainSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketChain
        fields = ['id', 'is_active']
        # read_only_fields = ('id',)

    def update(self, instance, validated_data):
        marketChainID = self.data['id']
        status = validated_data.pop('is_active')
        instance.is_active = status
        instance.save()

        if(status == False):
            Market.objects.filter(marketChain__id=marketChainID).update(
                is_active=status)
            Shop.objects.filter(market__marketChain__id=marketChainID).update(
                is_active=status)

        return instance


# Market
class OpenCloseMarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = ['id', 'is_active']

    def update(self, instance, validated_data):
        marketID = self.data['id']
        status = validated_data.pop('is_active')
        instance.is_active = status
        instance.save()

        if(status == False):
            Shop.objects.filter(market__marketChain__id=marketID).update(
                is_active=status)

        return instance
