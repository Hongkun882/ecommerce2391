from django.urls import path
from base.views import user_view as views

urlpatterns = [
    
    path('',views.getUsers,name='users'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name='user_profile'),
    path('profile/update/', views.updateUserProfile, name='user_profile_update'),
    path('register/', views.registerUser,name='register'),
    path('<str:pk>/',views.getUserByID,name='users'),
    path('delete/<str:pk>/', views.deleteUser,name='delete'),
    path('update/<str:pk>/', views.updateUser,name='update')
]