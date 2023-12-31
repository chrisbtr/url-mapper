from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from ..models import URLMapping
from .serializers import URLMappingSerializer

class URLMappingViewSet(ModelViewSet):
  queryset = URLMapping.objects.all()
  serializer_class = URLMappingSerializer

  def retrieve(self, request: Request, pk: str | None = None):
    if pk != None:
      cached_data = cache.get(pk)
      if cached_data != None:
        return Response(cached_data)

    mapping = get_object_or_404(self.queryset, pk=pk)
    serializer = self.serializer_class(mapping)

    if pk != None:
      cache.set(pk, serializer.data)
  
    return Response(serializer.data)