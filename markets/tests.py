from django.test import TestCase
from .models import MarketChain, MarketChainImages, DeliveryLocation, Market, MarketImages, CustomerFavoriteLocation
from accounts.models import MarketAdmin
from django.core.files import File

file_path = 'D:\Desktops\stuff picture\Project'


# class MarketChainTestCase(TestCase):

#     @classmethod
#     def setUpTestData(cls):
#         marketChainData = dict()

#         marketChainData['marketAdmin'] = MarketAdmin.objects.get(
#             user__first_name="MarketAdminTestSubject")

#         marketChainData['name'] = "MarketChainTestSubject"
#         marketChainData['desc'] = "MarketChainDescription"
#         marketChainData['location'] = "13.726760352215514,100.775426030159"


#         marketChain = MarketChain.objects.create(**marketChainData)
#         marketChain.main_image.save("kmitl01.png", File(
#             open(file_path+'\kmitl01.png', 'rb')))
#         marketChain.save()

#     def test_MarketChainAdmin(self):
#         marketChain = MarketChain.objects.get(
#             user__name="MarketAdminTestSubject")

#         admin = MarketAdmin.objects.get(
#             user__first_name="MarketAdminTestSubject")

#         self.assertEqual(
#             marketChain.marketAdmin, admin
#         )
