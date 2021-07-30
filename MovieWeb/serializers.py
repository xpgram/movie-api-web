from rest_framework import serializers
from .models import MovieWeb

class MovieWebSerializer (serializers.ModelSerializer):
  class Meta:
    model = MovieWeb
    fields = '__all__'