from django.urls import path
from base.views import order_view 
urlpatterns = [
    path('', view=order_view.getOrders,name='orders'),
    path('add/', view=order_view.addOrderItems, name='orders-add'),
    path('myorders/',view=order_view.getOrderByUser, name='user-orders'),
    path('<str:pk>/',view=order_view.getOrderById, name='user-order'),
    path('<str:pk>/pay/',view=order_view.updateOrdertoPaid, name='pay-order'),
    path('<str:pk>/deliver/',view=order_view.updateOrderToDeliver, name='deliver-order')
]