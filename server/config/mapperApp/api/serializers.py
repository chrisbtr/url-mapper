from rest_framework.serializers import ModelSerializer
from ..models import URLMapping

class URLMappingSerializer(ModelSerializer):
  class Meta:
    model = URLMapping
    fields = ('urlKey', 'fullURL')