from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.request import Request
from ..models import URLMapping
from .serializers import URLMappingSerializer

class URLMappingViewSet(ModelViewSet):
  queryset = URLMapping.objects.all()
  serializer_class = URLMappingSerializer
  filter_backends = [filters.SearchFilter]
  search_fields = ['urlKey', 'fullURL']

  def retrieve(self, request: Request, pk: str | None = None):
    has_cache = True
    if pk != None:
      try:
        cached_data = cache.get(pk)
        if cached_data != None:
          return Response(cached_data)
      except Exception as e:
        has_cache = False
        print(e)

    mapping = get_object_or_404(self.queryset, pk=pk)
    serializer = self.serializer_class(mapping)

    if pk != None and has_cache:
      cache.set(pk, serializer.data)
  
    return Response(serializer.data)