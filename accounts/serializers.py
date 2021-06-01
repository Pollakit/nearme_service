# accounts/serializers.py

# GET POST  -   CustomUser
# GET PUT   -   CustomUser<id>

# GET POST  -   Customer
# GET PUT   -   Customer<id>

# GET POST  -   ShopOwner
# GET PUT   -   ShopOwner<id>

# GET POST  -   MarketAdmin
# GET PUT   -   MarketAdmin<id>


from rest_framework import serializers
from .models import CustomUser, Customer, ShopOwner, MarketAdmin
# from markets.serializers import DeliveryLocationSerializer
from markets.serializers import RoughFavoriteLocationSerializer
from shops.models import CustomerFavoriteShop
import json


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name',
                  'password', 'phone', 'type', ]
        extra_kwargs = {
            'username': {'validators': []},
        }
        read_only_fields = ['type']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class CustomerSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(many=False)
    # delverylocations = DeliveryLocationSerializer(many=True, read_only=True)
    delverylocation = serializers.SerializerMethodField(
        "getMainDelveryLocation")

    class Meta:
        model = Customer
        fields = ['id', 'user', 'delverylocation']

    def getMainDelveryLocation(self, obj):
        return RoughFavoriteLocationSerializer(obj.customerfavoritelocation_set.filter(is_main=True), many=True).data

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create(type="CUSTOMER", **user_data)
        user.set_password(user_data['password'])
        user.save()
        customer = Customer.objects.create(user=user, **validated_data)

        return customer

    def update(self, instance, validated_data):
        # user_data = validated_data.pop('user')
        # user = instance.user
        # instance.save()

        # user.username = user_data.get('username', user.username)
        # user.email = user_data.get('email', user.email)
        # user.first_name = user_data.get('first_name', user.first_name)
        # user.last_name = user_data.get('last_name', user.last_name)
        # user.phone = user_data.get('phone', user.phone)
        # user.type = user_data.get('type', user.type)
        # user.save()

        # return instance

        user_data = validated_data.pop('user')
        if('type' in user_data.keys()):
            user_data.pop('type')
        user = instance.user
        instance.save()

        for attr, value in user_data.items():
            if attr == 'password':
                user.set_password(value)
            else:
                setattr(user, attr, value)

        user.save()
        return instance


class ShopOwnerSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(many=False)

    class Meta:
        model = ShopOwner
        fields = ['id', 'user', 'homeAddress', 'image', ]

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create(type="SHOPOWNER", **user_data)
        user.set_password(user_data['password'])
        user.save()
        shopowner = ShopOwner.objects.create(user=user, **validated_data)

        return shopowner

    def update(self, instance, validated_data):

        user = instance.user

        if('user' in validated_data.keys()):
            user_data = validated_data.pop('user')

            if('type' in user_data.keys()):
                user_data.pop('type')

            for attr, value in user_data.items():
                if attr == 'password':
                    user.set_password(value)
                else:
                    setattr(user, attr, value)
            user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


class MarketAdminSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(many=False)

    class Meta:
        model = MarketAdmin
        fields = ['id', 'user', 'image', ]
        read_only_fields = ['user']
