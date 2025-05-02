from django.contrib.auth import login, logout
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.request import Request
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer, URLMappingSerializer
from .validations import custom_validation, validate_password, validate_username
from .paginations import URLMappingPagination
from .models import URLMapping, AppUser

# Create your views here.
class UserRegister(APIView):
  permission_classes = (permissions.AllowAny,)

  def post(self, request):
    try:
      data = custom_validation(request.data)
      serializer = UserRegisterSerializer(data=data)
      if serializer.is_valid(raise_exception=True):
        user = serializer.create(data)
        if user:
          return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except ValidationError as e:
      return Response({e.code: [e.message]}, status=status.HTTP_400_BAD_REQUEST)

    
class UserLogin(APIView):
  permission_classes = (permissions.AllowAny,)
  authentication_classes = (SessionAuthentication,)

  def post(self, request):
    try: 
      data = request.data
      validate_password(data)
      validate_username(data)

      serializer = UserLoginSerializer(data=data)
      if serializer.is_valid(raise_exception=True):
        user = serializer.check_user(data)
        login(request, user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ValidationError as e:
      return Response({e.code: [e.message]}, status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
  permission_classes = (permissions.AllowAny,)
  authentication_classes = ()
  
  def post(self, request):
    logout(request)

    return Response(status=status.HTTP_200_OK)

class UserView(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)

  def get(self, request: Request):
    serializer = UserSerializer(request.user)
    return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class URLMappingViewSet(ModelViewSet):
  queryset = URLMapping.objects.all()
  serializer_class = URLMappingSerializer
  pagination_class = URLMappingPagination
  filter_backends = [filters.SearchFilter, DjangoFilterBackend]
  filterset_fields = ['userId']
  search_fields = ['urlKey', 'fullURL']
  permission_classes = (permissions.AllowAny,)

  def retrieve(self, request, pk: str | None = None):
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

  def create(self, request: Request, *args, **kwargs):
    # get the user making the request
    user: AppUser = request.user

    if user.is_authenticated:
      # If a user is logged in add there user id to the `URLMapping` 
      serializer: URLMappingSerializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      instance = serializer.save()
      serializer.update(instance, {'userId': user})
      headers = self.get_success_headers(serializer.data)
      return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # If not logged in create a `URLMapping` without a user id
    return super().create(request, *args, **kwargs)
    
  def destroy(self, request: Request, *args, **kwargs):
    # get the the URLMapping to delete
    instance: URLMapping = self.get_object()

    # get the user making the request
    user: AppUser = request.user

    # if the user is logged in and created the `URLMapping` or was created by an anonymous user,
    # then delete the `URLMapping`
    if user.is_authenticated and (instance.userId == user or instance.userId == None):
      return super().destroy(request, *args, **kwargs)

    # if the user can't delete the `URLMapping` respond with a 401 status
    return Response(status=status.HTTP_401_UNAUTHORIZED)
    
