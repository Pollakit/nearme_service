# accounts/urls.py

# GET POST  -   CustomUser
# GET PUT   -   CustomUser<id>

# GET POST  -   Customer
# GET PUT   -   Customer<id>

# GET POST  -   ShopOwner
# GET PUT   -   ShopOwner<id>

# GET POST  -   MarketAdmin
# GET PUT   -   MarketAdmin<id>

from django.urls import path
from .views import UserList, UserDetail, CustomerList, CustomerDetail, ShopOwnerList, ShopOwnerDetail, MarketAdminList, MarketAdminDetail


urlpatterns = [
    # path('users/', UserList.as_view()),
    # path('users/<int:pk>/', UserDetail.as_view()),

    path('customers/', CustomerList.as_view()),
    path('customers/<int:pk>/', CustomerDetail.as_view()),

    path('shopowners/', ShopOwnerList.as_view()),
    path('shopowners/<int:pk>/', ShopOwnerDetail.as_view()),

    path('marketadmins/', MarketAdminList.as_view()),
    path('marketadmins/<int:pk>/', MarketAdminDetail.as_view()),
]
