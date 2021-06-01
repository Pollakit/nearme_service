# Generated by Django 3.2.3 on 2021-05-31 08:32

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('shops', '0001_initial'),
        ('accounts', '0001_initial'),
        ('markets', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('totalPrice', models.FloatField(default=0.0, verbose_name='TotalPrice')),
                ('state', models.CharField(choices=[('CANCEL', 'Cancel'), ('ORDERED', 'Ordered'), ('RECIEVED', 'Recieved'), ('DELIVERED', 'Delivered'), ('PAID', 'Paid')], max_length=9)),
                ('deliverName', models.CharField(blank=True, max_length=100, null=True, verbose_name='Deliver Name')),
                ('deliverPhone', models.CharField(blank=True, max_length=10, validators=[django.core.validators.RegexValidator(regex='^\\d{9,10}$')])),
                ('deliveryNote', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.customer', verbose_name='CustomerID')),
                ('deliveryLocation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='markets.deliverylocation', verbose_name='deliveryLocation')),
                ('shop', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='shops.shop', verbose_name='ShopID')),
            ],
            options={
                'verbose_name': 'Order',
                'verbose_name_plural': 'Orders',
            },
        ),
        migrations.CreateModel(
            name='OrderedProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(blank=True, default=0.0, null=True, verbose_name='OrderedProductPrice')),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='orders.order', verbose_name='OrderID')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='shops.product', verbose_name='ProductID')),
            ],
        ),
        migrations.CreateModel(
            name='OrderedDecorator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(blank=True, default=0.0, null=True, verbose_name='OrderedDecoratorPrice')),
                ('decorator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='shops.decorator', verbose_name='DecoratorID')),
                ('orderedProduct', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='orders.orderedproduct', verbose_name='OrderedProductID')),
            ],
        ),
    ]