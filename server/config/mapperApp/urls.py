from django.urls import path
from .views import UserLogin, UserLogout, UserRegister, UserView, URLMappingViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'mappings', URLMappingViewSet)

urlpatterns = [
  path('account/register', UserRegister.as_view(), name='register'),
  path('account/login', UserLogin.as_view(), name='login'),
  path('account/logout', UserLogout.as_view(), name='logout'),
  path('account/user', UserView.as_view(), name='user'),
] + router.urls
