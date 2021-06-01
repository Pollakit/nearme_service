# orders/serializers.py
import crc16
from rest_framework import serializers
from .models import Order, OrderedProduct, OrderedDecorator
from shops.models import Shop
from accounts.serializers import CustomerSerializer


class OrderedDecoratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderedDecorator
        fields = ['id', 'orderedProduct', 'decorator', 'price']
        read_only_fields = ['id', 'orderedProduct']


class OrderedProductSerializer(serializers.ModelSerializer):
    # decorators = serializers.SerializerMethodField("getDecorators")
    decorators = OrderedDecoratorSerializer(
        source="ordereddecorator_set", many=True)

    class Meta:
        model = OrderedProduct
        fields = ['id', 'order', 'product', 'price', 'decorators']
        read_only_fields = ['id']

    # def getDecorators(self, obj):
    #     return OrderedDecoratorSerializer(obj.ordereddecorator_set.all(), many=True).data

    def create(self, validated_data):
        # decorators_data = self.data['decorators'].copy()
        if('ordereddecorator_set' in validated_data.keys()):
            decorators_data = validated_data.pop('ordereddecorator_set')

        try:
            product = OrderedProduct.objects.create(**validated_data)

        except TypeError:
            msg = (
                'Got a `TypeError` when calling `OrderedProduct.objects.create()`.'
            )
            raise TypeError(msg)

        try:
            for decorator_data in decorators_data:
                decorator, created = OrderedDecorator.objects.get_or_create(
                    orderedProduct=product, **decorator_data)
            return product

        except TypeError:
            product = OrderedProduct.objects.get(pk=product.id)
            product.delete()
            msg = (
                'Got a `TypeError` when calling `OrderedDecorator.objects.get_or_create()`.'
            )
            raise TypeError(msg)

        return product


class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField("getProducts")
    promptpay = serializers.SerializerMethodField('qr_code')

    class Meta:
        model = Order
        fields = ['id', 'customer', 'shop', 'totalPrice', 'state', 'deliveryLocation', 'deliveryNote',
                  'products', 'promptpay', 'deliverName', 'deliverPhone', 'created_at', 'updated_at']
        read_only_fields = ['id', 'promptpay', 'deliverName', 'state',
                            'deliverPhone', 'created_at', 'updated_at']

    def getProducts(self, obj):
        return OrderedProductSerializer(obj.orderedproduct_set.all(), many=True).data

    def create(self, validated_data):
        state = "ORDERED"
        shop = validated_data.pop('shop')
        deliverName = shop.deliverName
        deliverPhone = shop.deliverPhone

        try:
            order = Order.objects.create(
                shop=shop, state=state,
                deliverName=deliverName, deliverPhone=deliverPhone,
                **validated_data)

        except TypeError:
            msg = (
                'Got a `TypeError` when calling `Product.objects.create()`.'
            )
            raise TypeError(msg)

        return order

    # def create(self, validated_data):
    #     customer = validated_data.pop('customer')
    #     shop = validated_data.pop('shop')
    #     state = "ORDERED"
    #     products_data = self.data('products')
    #     deliverName, deliverPhone = Shop.objects.filter(
    #         shop__id=shop).values_list('deliverName', 'deliverPhone').get()

    #     # Get price
    #     totalPrice = 0
    #     for product in products_data:
    #         if('decorators' in product.keys()):
    #             for decorator in product['decorators']:
    #                 totalPrice += int(decorator['price'])

    #         totalPrice += int(product['price'])

    #     try:
    #         order = Order.objects.create(
    #             customer=customer, shop=shop, state=state,
    #             deliverName=deliverName, deliverPhone=deliverPhone,
    #             totalPrice=totalPrice, **validated_data)

    #     except TypeError:
    #         msg = (
    #             'Got a `TypeError` when calling `Product.objects.create()`.'
    #         )
    #         raise TypeError(msg)

    #     try:
    #         for product_data in products_data:
    #             if('decorators' in product_data.keys()):
    #                 decorators_data = product_data.pop('decorators')

    #             product, created = OrderedProduct.objects.get_or_create(
    #                 order=order, **product_data)

    #             try:
    #                 for decorator_data in decorators_data:
    #                     decorator, created = OrderedDecorator.objects.get_or_create(
    #                         product=product, **decorator_data)

    #             except TypeError:
    #                 decorator = decorator.objects.get(pk=decorator.id)
    #                 decorator.delete()
    #                 msg = (
    #                     'Got a `TypeError` when calling `OreredDecorator.objects.get_or_create()`.'
    #                 )
    #                 raise TypeError(msg)

    #         return order

    #     except TypeError:
    #         product = product.objects.get(pk=product.id)
    #         product.delete()
    #         msg = (
    #             'Got a `TypeError` when calling `OrderedProduct.objects.get_or_create()`.'
    #         )
    #         raise TypeError(msg)

    #     return order

    def qr_code(self, obj):
        # return obj.shop.promptpayIdentifier
        merchant_identifier = obj.shop.promptpayIdentifier
        money = str(obj.totalPrice)
        Version = "0002"+"01"  # PromptPay version
        one_time = "010212"    # field 01 length 02 11- multiple time 12- one time use

        if len(merchant_identifier) == 10 or len(merchant_identifier) == 13:
            # Merchant identifier 01  phone, 02 National ID or Tax ID
            merchant_account_information = "2937"
        else:
            merchant_account_information = "2939"  # Merchant identifier (ref)

        # PromptPay application ID field 00 length 16
        merchant_account_information += "0016" + "A000000677010111"
        if len(merchant_identifier) == 10:  # phone
            merchant_identifier = list(merchant_identifier)
            merchant_account_information += "011300"  # phone 01 length 13 start with 00
            merchant_account_information += "66"  # country code 66 TH
            del merchant_identifier[0]  # delete 0 from first phone num
            merchant_account_information += ''.join(merchant_identifier)
        elif len(merchant_identifier) == 13:  # National ID or Tax ID
            merchant_account_information += "0213" + \
                merchant_identifier.replace('-', '')
        else:  # ref
            merchant_account_information += "0315" + merchant_identifier + "5303764"
        country = "5802" + "TH"
        currency = "5303" + "764"  # THB
        if money != "":  # ex. 100.00
            check_money = money.split('.')
            # 54 Transaction Amount
            # only whole number or 1 digit decimal point
            if len(check_money) == 1 or len(check_money[1]) == 1:
                money = "54" + "0" + \
                    str(len(str(float(money))) + 1) + str(float(money)) + "0"
            else:  # full digit decimal point
                money = "54" + "0" + \
                    str(len(str(float(money)))) + str(float(money))
        check_sum = Version+one_time+merchant_account_information + \
            country+currency+money+"6304"
        check_sum1 = hex(crc16.crc16xmodem(
            check_sum.encode('ascii'), 0xffff)).replace('0x', '')
        if len(check_sum1) < 4:  # less than 4 digits
            check_sum1 = ("0"*(4-len(check_sum1))) + check_sum1
        check_sum += check_sum1

        return check_sum.upper()


class UpdateOrderStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'state']
