from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from .models import URLMapping

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserModel
    fields = '__all__'

  def create(self, validated_data):
    user_object = UserModel.objects.create_user(username=validated_data['username'], password=validated_data['password'])
    return user_object


class UserLoginSerializer(serializers.Serializer):
  password = serializers.CharField()

  def check_user(self, validated_data):
    user = authenticate(username=validated_data['username'], password=validated_data['password'])

    if not user:
      raise ValidationError("user not found")
    return user

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserModel
    fields = ('username', 'user_id')

class URLMappingSerializer(serializers.ModelSerializer):
  class Meta:
    model = URLMapping
    fields = ('userId', 'urlKey', 'fullURL')

