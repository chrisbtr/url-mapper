from django.contrib import admin
from .models import URLMapping, AppUser

# Register your models here.
admin.site.register(AppUser)
admin.site.register(URLMapping)