# accounts\models.py

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class CustomUser(AbstractUser):
    class Types(models.TextChoices):
        CUSTOMER = "CUSTOMER"
        SHOPOWNER = "SHOPOWNER"
        MARKETADMIN = "MARKETADMIN"

    phone_regex = RegexValidator(regex=r'^\d{9,10}$')
    # number with 9 or 10 digits
    phone = models.CharField(
        validators=[phone_regex], max_length=10, blank=False, null=False)
    type = models.CharField(max_length=11,
                            choices=Types.choices)


class Customer(models.Model):
    user = models.ForeignKey(CustomUser, verbose_name=_(
        "user"), on_delete=models.CASCADE, null=True)  # null = False

    class Meta:
        verbose_name = _("Customer")
        verbose_name_plural = _("Customers")

    def __str__(self):
        return "Customer: " + self.user.first_name + self.user.last_name

    def get_absolute_url(self):
        return reverse("Customer_detail", kwargs={"pk": self.pk})


class ShopOwner(models.Model):
    user = models.ForeignKey(CustomUser, verbose_name=_(
        "user"), on_delete=models.CASCADE, null=True)  # null = False
    # shop = models.ForeignKey(Shop, verbose_name=_(
    #     "shop"), on_delete=models.SET_NULL, null=True)
    homeAddress = models.TextField(blank=False, null=True)  # null = False
    image = models.ImageField(
        _("shop_owner_img"), upload_to='images/shopOwner/', blank=False, null=True)  # null = False

    class Meta:
        verbose_name = _("ShopOwner")
        verbose_name_plural = _("ShopOwners")

    def __str__(self):
        return "Shop Owner: " + self.user.first_name + self.user.last_name

    def get_absolute_url(self):
        return reverse("ShopOwner_detail", kwargs={"pk": self.pk})


class MarketAdmin(models.Model):
    user = models.ForeignKey(CustomUser, verbose_name=_(
        "user"), on_delete=models.CASCADE, null=True)
    # marketChain = models.ForeignKey(MarketChain, verbose_name=_(
    #     "MarketChain"), on_delete=models.SET_NULL, null=True)
    image = models.ImageField(
        _("market_admin_img"), upload_to='images/marketAdmins/', blank=False, null=True)

    class Meta:
        verbose_name = _("MarketAdmin")
        verbose_name_plural = _("MarketAdmins")

    def __str__(self):
        return "Market Admin: " + self.user.first_name + self.user.last_name

    def get_absolute_url(self):
        return reverse("MarketAdmin_detail", kwargs={"pk": self.pk})
