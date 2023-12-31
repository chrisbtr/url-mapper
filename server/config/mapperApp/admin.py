from django.contrib import admin
from .models import URLMapping, User

# Register your models here.
admin.site.register(User)
admin.site.register(URLMapping)