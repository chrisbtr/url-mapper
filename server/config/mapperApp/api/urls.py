from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import URLMappingViewSet 

router = DefaultRouter()
router.register(r'api', URLMappingViewSet)