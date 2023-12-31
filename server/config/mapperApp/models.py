from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  pass

class URLMapping(models.Model):
  # user = models.ForeignKey("User", on_delete=models.CASCADE)
  urlKey = models.TextField(max_length=2048, unique=True, primary_key=True)
  fullURL = models.TextField(max_length=2048, blank=False, unique=False)