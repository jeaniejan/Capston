from django.urls import path, include
from . import views
from rest_framework import routers
router = routers.DefaultRouter(trailing_slash=False)
router.register('UserInfo', views.UserInfoView)

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('', include(router.urls)),
]