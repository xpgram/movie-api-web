from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MovieWebSerializer
from .models import MovieWeb

# Create your views here.

class MovieWebView (viewsets.ModelViewSet):
  serializer_class = MovieWebSerializer
  queryset = MovieWeb.objects.all()