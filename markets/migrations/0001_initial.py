# Generated by Django 3.2.3 on 2021-06-08 07:20

from django.db import migrations, models
import django.db.models.deletion
import location_field.models.plain


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeliveryLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='DeliveryLocationName')),
                ('location', location_field.models.plain.PlainLocationField(max_length=63)),
                ('image', models.ImageField(null=True, upload_to='images/deliveryLocations/', verbose_name='DeliveryLocationImage')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Market',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='MarketName')),
                ('main_image', models.ImageField(null=True, upload_to='images/markets/', verbose_name='MarketImage')),
                ('desc', models.TextField(null=True)),
                ('location', location_field.models.plain.PlainLocationField(max_length=63)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField()),
                ('deliveryLocations', models.ManyToManyField(blank=True, to='markets.DeliveryLocation', verbose_name='AvailableDeliveryLocaions')),
            ],
            options={
                'verbose_name': 'Market',
                'verbose_name_plural': 'Markets',
            },
        ),
        migrations.CreateModel(
            name='MarketChain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='MarketChainName')),
                ('main_image', models.ImageField(null=True, upload_to='images/marketChains/', verbose_name='MarketChainImage')),
                ('desc', models.TextField(null=True)),
                ('location', location_field.models.plain.PlainLocationField(max_length=63)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField()),
                ('marketAdmin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.marketadmin', verbose_name='MarketAdmin')),
            ],
            options={
                'verbose_name': 'MarketChain',
                'verbose_name_plural': 'MarketChains',
            },
        ),
        migrations.CreateModel(
            name='MarketImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/markets/', verbose_name='MarketMoreImage')),
                ('market', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='markets.market')),
            ],
        ),
        migrations.CreateModel(
            name='MarketChainImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/marketChains/', verbose_name='MarketChainMoreImage')),
                ('marketChain', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='markets.marketchain')),
            ],
        ),
        migrations.AddField(
            model_name='market',
            name='marketChain',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='markets.marketchain', verbose_name='marketChain'),
        ),
        migrations.AddField(
            model_name='deliverylocation',
            name='created_for',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='markets.marketchain', verbose_name='ForWhichMarketChain'),
        ),
        migrations.CreateModel(
            name='CustomerFavoriteLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_main', models.BooleanField(verbose_name='Customer Main Delivery Location')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.customer', verbose_name='Customer_ID')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='markets.deliverylocation', verbose_name='FavoriteLocation')),
            ],
        ),
    ]
