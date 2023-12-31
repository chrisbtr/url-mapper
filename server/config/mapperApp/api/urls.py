from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import URLMappingViewSet #, RedirectView

router = DefaultRouter()
router.register(r'api', URLMappingViewSet)
# router.register(r'test', RedirectView)