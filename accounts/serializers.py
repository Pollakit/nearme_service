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
from dj_rest_auth.serializers import UserDetailsSerializer, TokenSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from django.core.validators import RegexValidator


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone_regex = RegexValidator(regex=r'^\d{9,10}$')
    phone = serializers.CharField(
        validators=[phone_regex], max_length=10, required=True)
    type = serializers.ChoiceField(
        choices=['CUSTOMER', 'SHOPOWNER'], required=True)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        data_dict['phone'] = self.validated_data.get('phone', '')
        data_dict['type'] = self.validated_data.get('type', '')

        return data_dict


class CustomUserDetailsSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + \
            ('first_name', 'last_name', 'phone', 'type',)


class CustomTokenSerializer(TokenSerializer):
    user = CustomUserDetailsSerializer(read_only=True)

    class Meta(TokenSerializer.Meta):
        fields = ('key', 'user')


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
    delverylocation = serializers.SerializerMethodField(
        "getMainDelveryLocation")

    user = CustomUserDetailsSerializer(many=False)

    class Meta:
        model = Customer
        fields = ['id', 'user', 'delverylocation']

    def getMainDelveryLocation(self, obj):
        return RoughFavoriteLocationSerializer(obj.customerfavoritelocation_set.filter(is_main=True), many=True).data

    # def create(self, validated_data):
    #     user_data = validated_data.pop('user')
    #     user = CustomUser.objects.create(type="CUSTOMER", **user_data)
    #     user.set_password(user_data['password'])
    #     user.save()
    #     customer = Customer.objects.create(user=user, **validated_data)

    #     return customer

    def update(self, instance, validated_data):

        user_data = validated_data.pop('user')
        if('type' in user_data.keys()):
            user_data.pop('type')

        if('password' in user_data.keys()):
            user_data.pop('password')

        user_data['type'] = "CUSTOMER"
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

    # def create(self, validated_data):
    #     user_data = validated_data.pop('user')
    #     user = CustomUser.objects.create(type="SHOPOWNER", **user_data)
    #     user.set_password(user_data['password'])
    #     user.save()
    #     shopowner = ShopOwner.objects.create(user=user, **validated_data)

    #     return shopowner

    def update(self, instance, validated_data):

        user = instance.user

        if('user' in validated_data.keys()):
            user_data = validated_data.pop('user')

            if('type' in user_data.keys()):
                user_data.pop('type')

            if('password' in user_data.keys()):
                user_data.pop('password')

            user_data['type'] = "SHOPOWNER"

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
