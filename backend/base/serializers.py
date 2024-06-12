from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress,Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):

    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = "__all__"

    def get_reviews(self,obj):
        reviews = obj.review_set.all()
        serializers = ReviewSerializer(reviews, many=True)

        return serializers.data


class UserSerializer(serializers.ModelSerializer):

    isAdmin = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["_id", "username", "email", "isAdmin"]

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get__id(self, obj):
        return obj.id


class UserSerializerWithToken(UserSerializer):

    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["_id", "username", "email", "isAdmin", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)

        return str(token.access_token)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Order
        fields = "__all__"

    def get_orderItems(self, obj):
        print("The obj is",obj)
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        address = obj.shippingaddress_set.get()
        print(address)
        serializer = ShippingAddressSerializer(address, many=False)
        
        return serializer.data

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
