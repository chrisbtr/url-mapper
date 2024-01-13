from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Create your models here.
class AppUserManager(BaseUserManager):
  def create_user(self, username, password=None):
    if not username:
      raise ValueError("A username is required")
    
    if not password:
      raise ValueError("A password is required")

    user = self.model(username=username)
    user.set_password(password)
    user.save()

    return user
  
  def create_superuser(self, username, password=None):
    if not username:
      raise ValueError("A username is required")
    
    if not password:
      raise ValueError("A password is required")

    user = self.create_user(username, password)
    user.is_superuser = True
    user.save()

    return user

class AppUser(AbstractBaseUser, PermissionsMixin):
  USERNAME_FIELD = "username"
  user_id = models.AutoField(primary_key=True)
  username = models.CharField(max_length=50, unique=True)

  objects = AppUserManager()

class URLMapping(models.Model):
  # user = models.ForeignKey("User", on_delete=models.CASCADE)
  urlKey = models.TextField(max_length=200, unique=True, primary_key=True)
  fullURL = models.URLField(max_length=200)