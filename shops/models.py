# shops\models.py

from django.db import models
from django.urls import reverse
from django.contrib.postgres.fields.array import ArrayField
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator


class ShopCategory(models.Model):
    name = models.CharField("ShopCategory", max_length=100,
                            blank=False, null=False, unique=True)

    class Meta:
        verbose_name = "ShopCategory"
        verbose_name_plural = "ShopCategories"

    def __str__(self):
        return self.name


class Shop(models.Model):
    shopOwner = models.ForeignKey(
        "accounts.ShopOwner", verbose_name="ShopOwner", on_delete=models.CASCADE, blank=False, null=False)
    market = models.ForeignKey(
        "markets.Market", verbose_name="MarketID", on_delete=models.CASCADE, blank=False, null=False)

    name = models.CharField("ShopName", max_length=100,
                            blank=False, null=False, )
    main_image = models.ImageField(
        verbose_name="ShopImage", upload_to='images/shops/', blank=False, null=True)
    desc = models.TextField(blank=False, null=True)
    categories = models.ManyToManyField(
        ShopCategory, related_name="ShopCategories", blank=False, null=True)
    promptpayIdentifier = models.CharField(
        max_length=13, blank=False, null=True)

    phone_regex = RegexValidator(regex=r'^\d{9,10}$')

    deliverName = models.CharField("Deliver Name",
                                   max_length=100, blank=False, null=True)
    deliverPhone = models.CharField(
        validators=[phone_regex], max_length=10, blank=False)

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Shop"
        verbose_name_plural = "Shops"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Shop_detail", kwargs={"pk": self.pk})


class ShopImages(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    image = models.ImageField(
        verbose_name="ShopMoreImage", upload_to='images/shops/', blank=False, null=False)


class MenuCategory(models.Model):
    shop = models.ForeignKey(
        Shop, on_delete=models.CASCADE, null=False)

    name = models.CharField(
        "MenuCategory", max_length=100, blank=False, null=False)
    desc = models.TextField(blank=False, null=True, )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "MenuCategory"
        verbose_name_plural = "MenuCategories"

    def __str__(self):
        return self.name


class Decorator(models.Model):
    shop = models.ForeignKey(Shop,
                             on_delete=models.CASCADE, null=False)
    name = models.CharField(
        "Decorator", max_length=100, blank=False, null=True)
    desc = models.TextField(blank=False, null=True)
    price = models.FloatField(
        verbose_name="DecoratorPrice", blank=False, null=True, default=0.0)

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        MenuCategory, verbose_name="MenuCategory", on_delete=models.CASCADE, null=False)

    name = models.CharField(
        "Product", max_length=100, blank=False, null=False)
    main_image = models.ImageField(
        verbose_name="ProductImage", upload_to='images/products/', blank=False, null=True)
    desc = models.TextField(blank=False, null=True)
    price = models.FloatField(
        verbose_name="ProductPrice", blank=False, null=True, default=0.0)
    decorators = models.ManyToManyField(
        Decorator, verbose_name="Decorators", blank=False, null=True)

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ProductImages(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(
        verbose_name="ProductImage", upload_to='images/products/', blank=False, null=False)


class CustomerFavoriteShop(models.Model):
    customer = models.ForeignKey("accounts.Customer", verbose_name=_(
        "Customer_ID"), on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop, verbose_name=_(
        "FavoriteShop"), on_delete=models.CASCADE)

    def __str__(self):
        return self.customer.user.first_name + " : " + self.shop.name
