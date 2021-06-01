# orders\models.py

from django.db import models
from django.urls import reverse
from django.contrib.postgres.fields.array import ArrayField
from django.core.validators import RegexValidator

# Order
#     -Product +Price
#     -Product +Price
#         -Decorator + Price
#         -Decorator + Price
#     -Product


class Order(models.Model):
    customer = models.ForeignKey(
        "accounts.Customer", verbose_name="CustomerID", on_delete=models.SET_NULL, null=True)
    shop = models.ForeignKey(
        "shops.Shop", verbose_name="ShopID", on_delete=models.SET_NULL, null=True)
    totalPrice = models.FloatField(
        verbose_name="TotalPrice", blank=False, null=False)

    class States(models.TextChoices):
        CANCEL = "CANCEL"
        ORDERED = "ORDERED"
        RECIEVED = "RECIEVED"
        DELIVERED = "DELIVERED"
        PAID = "PAID"

    state = models.CharField(max_length=9,
                             choices=States.choices, null=False, blank=False)

    deliveryLocation = models.ForeignKey(
        "markets.DeliveryLocation", verbose_name="deliveryLocation", on_delete=models.SET_NULL, null=True)
    phone_regex = RegexValidator(regex=r'^\d{9,10}$')

    deliverName = models.CharField("Deliver Name",
                                   max_length=100, null=True, blank=True)
    deliverPhone = models.CharField(
        validators=[phone_regex], max_length=10, blank=True)
    deliveryNote = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def get_absolute_url(self):
        return reverse("Order_detail", kwargs={"pk": self.pk})


class OrderedProduct(models.Model):
    order = models.ForeignKey(
        Order, verbose_name="OrderID", on_delete=models.CASCADE)

    product = models.ForeignKey(
        "shops.Product", verbose_name="ProductID", on_delete=models.SET_NULL, null=True)
    price = models.FloatField(
        verbose_name="OrderedProductPrice", blank=True, null=True, default=0.0)


class OrderedDecorator(models.Model):
    orderedProduct = models.ForeignKey(
        OrderedProduct, verbose_name="OrderedProductID", on_delete=models.CASCADE)
    decorator = models.ForeignKey(
        "shops.Decorator", verbose_name="DecoratorID", on_delete=models.SET_NULL, null=True)
    price = models.FloatField(
        verbose_name="OrderedDecoratorPrice", blank=True, null=True, default=0.0)
