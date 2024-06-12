from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import OrderItem, Order, Product, ShippingAddress
from base.serializers import OrderSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from datetime import datetime


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data["orderItems"]
    print(orderItems)
    if orderItems and len(orderItems) == 0:
        return Response(
            {"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST
        )
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data["paymentMethod"],
            taxPrice=data["taxPrice"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"],
        )
        shippingAddress = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            country=data["shippingAddress"]["country"],
            zipCode=data["shippingAddress"]["zipCode"],
            shippingPrice=data["shippingPrice"],
        )
        for item in orderItems:

            product = Product.objects.get(_id=item["_id"])
            orderItem = OrderItem.objects.create(
                order=order,
                product=product,
                name=product.name,
                qty=item["qty"],
                price=item["price"],
                image=product.image.url,
            )
            product.count -= orderItem.qty
            product.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    try:
        user = request.user
        order = Order.objects.get(_id=pk)
        if user.is_staff or user == order.user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "Not Authorized to view this order"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    except:
        return Response(
            {"detail": "Order does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderByUser(request):
    try:
        user = request.user
        
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
    except:
        return Response(
            {"detail": "Order does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAdminUser])  
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

    

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrdertoPaid(request, pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response("Order was paid")

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderToDeliver(request, pk):
   
    order = Order.objects.get(_id=pk)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response("Order was delivered")
