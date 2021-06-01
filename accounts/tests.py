from django.test import TestCase
from .models import CustomUser, Customer, ShopOwner, MarketAdmin
from .serializers import CustomerSerializer
from markets.models import MarketChain, MarketChainImages, DeliveryLocation, Market, MarketImages, CustomerFavoriteLocation


from django.core.files import File
from rest_framework.reverse import reverse
from rest_framework import status


file_path = 'D:\Desktops\stuff picture\Project'


class CustomerTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        #################### Customer ####################################
        customerUserAccount = CustomUser.objects.create_user(
            username='CustomerTestSubject',
            email='CustomerTestSubject@example.com',
            first_name='CustomerTestSubject',
            last_name='NumberOne',
            password='123456789',
            phone='0888888888',
            type='CUSTOMER')
        customerUserAccount.save()
        customer = Customer.objects.create(user=customerUserAccount)
        customer.save()

        #################### ShopOwner####################################
        shopOwnerUserAccount = CustomUser.objects.create_user(
            username='ShopOwnerTestSubject',
            email='ShopOwnerTestSubject@example.com',
            first_name='ShopOwnerTestSubject',
            last_name='NumberOne',
            password='123456789',
            phone='0888888888',
            type='SHOPOWNER')
        shopOwnerUserAccount.save()
        shopOwner = ShopOwner.objects.create(user=shopOwnerUserAccount)
        shopOwner.image.save("kekw.jpg", File(
            open(file_path+'\kekw.jpg', 'rb')))
        shopOwner.save()

        #################### MarketAdmin #################################
        marketAdminUserAccount = CustomUser.objects.create_user(
            username='MarketAdminTestSubject',
            email='MarketAdminTestSubject@example.com',
            first_name='MarketAdminTestSubject',
            last_name='NumberOne',
            password='123456789',
            phone='0888888888',
            type='MARKETADMIN')
        marketAdminUserAccount.save()
        marketAdmin = MarketAdmin.objects.create(user=marketAdminUserAccount)
        marketAdmin.image.save("kekw.jpg", File(
            open(file_path+'\kekw.jpg', 'rb')))
        marketAdmin.save()

        ###################### MarketChain ##########################

        marketChain = MarketChain.objects.create(
            marketAdmin=marketAdmin,
            name="MarketChainTestSubject",
            desc="MarketChainDescription",
            location="13.726760352215514,100.775426030159",
            is_active=True
        )
        marketChain.main_image.save("kmitl01.png", File(
            open(file_path+'\kmitl01.png', 'rb')))
        marketChain.save()

        ###################### DeliveryLocation ##########################
        deliveryLocation = DeliveryLocation.objects.create(
            name='ECC',
            location="13.8,100.8",
            created_for=marketChain,
            is_active=True)

        ###################### Market ##########################
        market = Market.objects.create(
            marketChain=marketChain,
            name="CanteenTestSubject",
            desc="description",
            location="13.9,100.9",
            is_active=True
        )

        ###################### CustomerFavouriteLocation ##########################
        cfl = CustomerFavoriteLocation.objects.create(
            customer=customer,
            location=deliveryLocation,
            is_main=True
        )

    def test_customer_type(self):
        customer = Customer.objects.get(user__first_name="CustomerTestSubject")

        self.assertEqual(
            customer.user.username, "CustomerTestSubject"
        )

        self.assertEqual(
            customer.user.email, 'CustomerTestSubject@example.com'
        )

        self.assertEqual(
            customer.user.last_name, 'NumberOne'
        )

        self.assertEqual(
            customer.user.phone, '0888888888'
        )

        self.assertEqual(
            customer.user.type, 'CUSTOMER'
        )

    ########################### ShopOwnerTestCase ##############################
    def test_shop_owner_type(self):
        shopOwner = ShopOwner.objects.get(
            user__first_name="ShopOwnerTestSubject")

        self.assertEqual(
            shopOwner.user.username, "ShopOwnerTestSubject"
        )

        self.assertEqual(
            shopOwner.user.email, 'ShopOwnerTestSubject@example.com'
        )

        self.assertEqual(
            shopOwner.user.last_name, 'NumberOne'
        )

        self.assertEqual(
            shopOwner.user.phone, '0888888888'
        )

        self.assertEqual(
            shopOwner.user.type, 'SHOPOWNER'
        )

    ########################### MarketAdminTestCase############################
    def test_market_admin_features(self):
        marketAdmin = MarketAdmin.objects.get(
            user__first_name="MarketAdminTestSubject")

        self.assertEqual(
            marketAdmin.user.username, "MarketAdminTestSubject"
        )

        self.assertEqual(
            marketAdmin.user.email, 'MarketAdminTestSubject@example.com'
        )

        self.assertEqual(
            marketAdmin.user.last_name, 'NumberOne'
        )

        self.assertEqual(
            marketAdmin.user.phone, '0888888888'
        )

        self.assertEqual(
            marketAdmin.user.type, 'MARKETADMIN'
        )

    ########################### MarketChainTestCase############################
    def test_MarketChain_features(self):
        marketChain = MarketChain.objects.get(
            name="MarketChainTestSubject")

        marketAdmin = MarketAdmin.objects.get(
            user__first_name="MarketAdminTestSubject")

        self.assertEqual(
            marketChain.marketAdmin.id, marketAdmin.id
        )

        self.assertEqual(
            marketChain.name, "MarketChainTestSubject"
        )

        self.assertEqual(
            marketChain.location, "13.726760352215514,100.775426030159"
        )

        self.assertEqual(
            marketChain.is_active, True
        )

    ########################### DeliveryLocationTestCase #######################

    def test_deliveryLocation_features(self):
        deliveryLocation = DeliveryLocation.objects.get(name="ECC")
        self.assertEqual(
            deliveryLocation.location, "13.8,100.8"
        )

        self.assertEqual(
            deliveryLocation.is_active, True
        )

    ########################### Market #######################

    def test_market_features(self):
        market = Market.objects.get(name="CanteenTestSubject")
        self.assertEqual(
            market.location, "13.9,100.9"
        )

        self.assertEqual(
            market.desc, "description"
        )

        self.assertEqual(
            market.is_active, True
        )

    ########################### CustomerFavouriteLocation #######################

    def test_market_features(self):
        customer = Customer.objects.get(user__first_name="CustomerTestSubject")
        cfl = CustomerFavoriteLocation.objects.get(customer=customer)
        deliveryLocation = DeliveryLocation.objects.get(name="ECC")
        self.assertEqual(
            cfl.location, deliveryLocation
        )

        self.assertEqual(
            cfl.is_main, True
        )
