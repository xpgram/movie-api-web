from django.contrib import admin
from .models import MovieWeb

# Register your models here.

class MovieWebAdmin(admin.ModelAdmin):
  list_display = ('movieId', 'favorited')

admin.site.register(MovieWeb, MovieWebAdmin)