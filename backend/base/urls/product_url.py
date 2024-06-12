from django.urls import path
from base.views import product_view as views


urlpatterns = [
    
    path("", views.getProducts, name='products'),
    path('create/', views.createProduct, name='create'),
    path('upload/', views.uploadImage, name='upload'),
    path('top-products/', views.getTopProducts, name='top-product'),
    path('<str:pk>/', views.getProduct, name='product'),
    path('<str:pk>/delete/', views.deleteProduct, name='delete'),
    path('<str:pk>/update/', views.updateProduct, name='update'),
    path('<str:pk>/create-review/', views.createProductReview, name='create-review'),

]