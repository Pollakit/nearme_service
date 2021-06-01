# orders\admin.py
from django.contrib import admin
from .models import Order, OrderedDecorator, OrderedProduct

admin.site.register(Order)
admin.site.register(OrderedDecorator)
admin.site.register(OrderedProduct)
