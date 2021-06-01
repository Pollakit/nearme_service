# markets\models.py

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.contrib.postgres.fields.array import ArrayField
from location_field.models.plain import PlainLocationField


class MarketChain(models.Model):
    marketAdmin = models.ForeignKey(
        "accounts.MarketAdmin", verbose_name="MarketAdmin", on_delete=models.CASCADE)

    name = models.CharField("MarketChainName", max_length=100,
                            unique=True, null=False, blank=False)
    main_image = models.ImageField(verbose_name="MarketChainImage",
                                   upload_to='images/marketChains/', blank=False, null=True)
    desc = models.TextField(blank=False, null=True)
    location = PlainLocationField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    is_active = models.BooleanField()

    class Meta:
        verbose_name = "MarketChain"
        verbose_name_plural = "MarketChains"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("MarketChain_detail", kwargs={"pk": self.pk})


class MarketChainImages(models.Model):
    marketChain = models.ForeignKey(MarketChain, on_delete=models.CASCADE)
    image = models.ImageField(verbose_name="MarketChainMoreImage",
                              upload_to='images/marketChains/', blank=False, null=False)

    def __str__(self):
        return str(self.pk) + ". " + self.marketChain.name


class DeliveryLocation(models.Model):
    name = models.CharField("DeliveryLocationName",
                            max_length=100, null=False, blank=False)
    location = PlainLocationField()
    created_for = models.ForeignKey(
        MarketChain, verbose_name="ForWhichMarketChain", on_delete=models.CASCADE)

    image = models.ImageField(
        verbose_name="DeliveryLocationImage", upload_to='images/deliveryLocations/', blank=False, null=True)

    # customers = models.ManyToManyField(
    #     "accounts.Customer", verbose_name="Customers", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    is_active = models.BooleanField()

    def __str__(self):
        return self.name


class Market(models.Model):
    marketChain = models.ForeignKey(
        MarketChain, verbose_name="marketChain", on_delete=models.CASCADE)

    name = models.CharField("MarketName", max_length=100,
                            null=False, blank=False)
    main_image = models.ImageField(
        verbose_name="MarketImage", upload_to='images/markets/', null=True)
    # more_images = models.ManyToManyField(
    #     MarketImages, verbose_name="Additional market images")
    desc = models.TextField(blank=False, null=True)
    location = PlainLocationField()
    deliveryLocations = models.ManyToManyField(
        DeliveryLocation, verbose_name="AvailableDeliveryLocaions", blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    is_active = models.BooleanField()

    class Meta:
        verbose_name = "Market"
        verbose_name_plural = "Markets"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Market_detail", kwargs={"pk": self.pk})


class MarketImages(models.Model):
    market = models.ForeignKey(Market, on_delete=models.CASCADE)
    image = models.ImageField(verbose_name="MarketMoreImage",
                              upload_to='images/markets/', blank=True, null=True)

    def __str__(self):
        return str(self.pk) + ". " + self.market.name


class CustomerFavoriteLocation(models.Model):
    customer = models.ForeignKey("accounts.Customer", verbose_name=_(
        "Customer_ID"), on_delete=models.CASCADE)
    location = models.ForeignKey(DeliveryLocation, verbose_name=_(
        "FavoriteLocation"), on_delete=models.CASCADE)
    is_main = models.BooleanField("Customer Main Delivery Location")

    def __str__(self):
        return self.location.name + " Customer: " + self.customer.user.first_name
