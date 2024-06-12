from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Product, Review
from base.serializers import ProductSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(["GET"])
def getProducts(req):
    keyword = req.query_params.get('keyword')
    page = req.query_params.get('page')
    print(req.query_params)
    if keyword == None:
        keyword=''
    products = Product.objects.filter(name__icontains=keyword)
    paginator = Paginator(products,5)
    print("page is ", page)
    try:
        products = paginator.page(page)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    except PageNotAnInteger:
        products = paginator.page(1)

    serailizer = ProductSerializer(products, many=True)
    return Response({"products":serailizer.data, "page": page, "NumOfPage": paginator.num_pages})

@api_view(["GET"])
def getTopProducts(req):
    products = Product.objects.filter(rating__gte=4).order_by("-rating")[0:5]
    serailizer = ProductSerializer(products, many=True)
    return Response(serailizer.data)

@api_view(["GET"])
def getProduct(req, pk):
    product = Product.objects.get(_id=pk)
    serailizer = ProductSerializer(product, many=False)
    return Response(serailizer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProduct(req, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response("Product deleted!")


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(req):
    user = req.user
    product = Product.objects.create(
        user=user,
        name="Sample Name",
        brand="Sample brand",
        category="Sample Category",
        price=0,
        description="Some description",
        rating=0,
        ratingCount=0,
        count=0,
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProduct(req, pk):
    data = req.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.price = data['price']
    product.count = data['count']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def uploadImage(req):
    print("-------------------------")
    data = req.data
    product = Product.objects.get(_id=data['_id'])
    product.image = req.FILES.get('image')
    print(product)
    print("++++++++++++++++++++++++++")
    product.save()
    print("888888888888888")
    return Response("Image was uploaded")

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createProductReview(req,pk):
    user = req.user
    product = Product.objects.get(_id=pk)
    data = req.data

    if product.review_set.filter(user=user).exists():
        return Response({'detail': "You already make a review in this product."},status=status.HTTP_400_BAD_REQUEST)
    
    if int(data['rating']) == 0:
        return Response({'detail': "Please include a rating."},status=status.HTTP_400_BAD_REQUEST)
    
    review = Review.objects.create(user=user,product=product, name=user.username,comment=data['comment'],rating=int(data['rating']))

    reviews = product.review_set.all()
    product.ratingCount = len(reviews)
    
    rating_total = 0
    for r in reviews:
        rating_total+=r.rating

    product.rating = rating_total / len(reviews)
    product.save()

    return Response("Review was added")
