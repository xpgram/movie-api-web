from rest_framework import serializers
from .models import MovieWeb, Vote

class MovieWebSerializer (serializers.ModelSerializer):
  class Meta:
    model = MovieWeb
    fields = '__all__'

class LookupSerializer (serializers.ModelSerializer):
  class Meta:
    model = Vote
    fields = '__all__'

class VoteSerializer (serializers.ModelSerializer):
  class Meta:
    model = Vote
    fields = '__all__'