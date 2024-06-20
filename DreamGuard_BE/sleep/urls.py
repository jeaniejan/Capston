from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterAPIView, AuthAPIView, UserViewSet, MyTokenObtainPairView, UserInfoViewSet
from django.urls import path, include
from rest_framework import routers


router = routers.DefaultRouter()
router.register('list', UserViewSet) # 유저리스트 (테스트용)
router.register('userinfo', UserInfoViewSet)

urlpatterns = [
    path("register/", RegisterAPIView.as_view()), # post:회원가입
    path("auth/", AuthAPIView.as_view()), # post:로그인, delete:로그아웃, get: 회원정보 
    path("auth/refresh/", TokenRefreshView.as_view()), # jwt 토큰 재발급
    path("", include(router.urls)),
     path('auth/token/',  MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]